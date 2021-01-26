import styled from "styled-components";
import db from "../db.json";
import Widget from "../src/components/Widget";
import QuizLogo from "../src/components/QuizLogo";
import QuizBackground from "../src/components/QuizBackground";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import Link from "next/link";
import Head from "../src/components/Head";

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

export default function Home() {
  const [nome, setNome] = React.useState("");
  const regex = /^[a-z]\w+$/gi;

  function handleClick() {
    if (regex.test(nome)) window.localStorage.setItem("jogador", nome);
  }

  return (
    <>
      <Head title={db.title} bg={db.bg} description={db.description} />
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1> {`☢ ${db.title} ☢`}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
              <Widget.Nome>
                <input
                  type="text"
                  placeholder="Diz aí seu nome para jogar :)"
                  value={nome}
                  onChange={({ target }) => setNome(target.value)}
                  required
                />
                {regex.test(nome) && (
                  <Link href="/quiz">
                    <a onClick={handleClick}>JOGAR</a>
                  </Link>
                )}
              </Widget.Nome>
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
        <GitHubCorner projectUrl="https://github.com/AJP2511" />
      </QuizBackground>
    </>
  );
}
