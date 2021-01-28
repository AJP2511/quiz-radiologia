import styled from "styled-components";
import db from "../db.json";
import Widget from "../src/components/Widget";
import QuizLogo from "../src/components/QuizLogo";
import QuizBackground from "../src/components/QuizBackground";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import { useRouter } from "next/router";

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;

export const RankContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 500px) {
    h1 {
      padding-top: 1rem;
      border-top: 2px solid #459bd8;
    }
  }
`;

export const DivRankInterna = styled.ul`
  border: 1px solid #fb1;
  background-color: rgba(51, 51, 51, 0.5);
  border-radius: 10px;
  padding: 1rem 4rem;
  max-height: 300px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateX(-20px);
  animation: moveLeft 0.3s forwards;

  li {
    margin-bottom: 1rem;
    list-style: none;
  }

  li::before {
    content: "";
    display: inline-block;
    border-radius: 50%;
    position: relative;
    width: 10px;
    height: 10px;
    background-color: #fb1;
    left: -5px;
    top: -2px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #459bd8;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #2f82bd;
  }

  @keyframes moveLeft {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export const ButtonGo = styled.button``;

export const Form = styled.form`
  input {
    display: block;
    width: 100%;
    height: 38px;
    background-color: transparent;
    border: 1px solid #fbfbfb;
    border-radius: 3.5px;
    padding: 0.5rem 1rem;
    color: #fb1;
  }

  button {
    color: #000;
    width: 100%;
    height: 36px;
    margin-top: 25px;
    border-radius: 4px;
    background-color: #fb1;
    font-weight: bold;
    text-align: center;
    padding: 10px 1rem;
    border: none;
    letter-spacing: 4px;
  }

  button:hover {
    box-shadow: 0 0 0 3px #459bd8;
  }

  button:disabled {
    background-color: #888;
  }

  button:disabled:hover {
    box-shadow: none;
  }
`;

export default function Home() {
  const [name, setname] = React.useState("");
  const router = useRouter();
  const [rank, setRank] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    window.localStorage.setItem("jogador", name);
    router.push("/quiz");
  }

  React.useEffect(() => {
    if (window.localStorage.getItem("jogador")) {
      setname(window.localStorage.getItem("jogador"));
    }

    async function rankGlobal() {
      try {
        setLoading(true);
        const response = await fetch(process.env.MONGO_URL);
        const json = await response.json();
        setRank(json);
      } catch (err) {
        setErro(err);
      } finally {
        setLoading(false);
      }
    }
    rankGlobal();
  }, []);

  return (
    <QuizBackground backgroundImage={db.bg}>
      <MainContainer>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <Widget.TitlePrincipal>{`☢ ${db.title} ☢`}</Widget.TitlePrincipal>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
              <Form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Diz aí seu nome para jogar :)"
                  value={name}
                  onChange={({ target }) => setname(target.value)}
                  required
                />
                <button disabled={name.length === 0}>JOGAR</button>
              </Form>
            </Widget.Content>
          </Widget>

          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>

              <p>lorem ipsum dolor sit amet...</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        {loading ? (
          <RankContainer>
            <Loader />
          </RankContainer>
        ) : (
          rank && (
            <RankContainer>
              <h1>Ranking global!</h1>
              <p>Faça 60pts ou mais e coloque seu nome aqui!</p>
              <DivRankInterna>
                {rank.map(({ nome, pontos }) => (
                  <li key={nome}>{`${nome} - ${pontos} Pontos`}</li>
                ))}
              </DivRankInterna>
            </RankContainer>
          )
        )}
        {erro && <h1>{erro}</h1>}
      </MainContainer>
      <GitHubCorner projectUrl="https://github.com/AJP2511" />
    </QuizBackground>
  );
}
