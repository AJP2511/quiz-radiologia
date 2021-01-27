import styled from "styled-components";
import db from "../db.json";
import Widget from "../src/components/Widget";
import QuizLogo from "../src/components/QuizLogo";
import QuizBackground from "../src/components/QuizBackground";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import QuizOptions from "../src/components/QuizOptions";
import Image from "next/image";

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

export const ButtonNext = styled.button`
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

  &&:hover {
    box-shadow: 0 0 0 3px #459bd8;
  }
`;

export default function quiz() {
  const [pergunta, setPergunta] = React.useState(0);
  const [selecionado, setSelecionado] = React.useState(null);
  const [pontos, setPontos] = React.useState(0);
  const [check, setCheck] = React.useState(false);

  function handleClick() {
    const indexCorrecao = db.questions[pergunta].answer;
    const ArrayRespostas = db.questions[pergunta].alternatives;
    if (selecionado == ArrayRespostas[indexCorrecao]) {
      setPontos(pontos + 1);
    }
    setPergunta(pergunta + 1);
    console.log(pontos);
  }

  React.useEffect(() => {
    setCheck(!check);
  }, [selecionado]);

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.questions[pergunta].title}</h1>
          </Widget.Header>
          <Widget.Content>
            <Image
              src={db.questions[pergunta].image}
              alt="ilustracao"
              layout="responsive"
              width={400}
              height={200}
            />
            <p>{db.questions[pergunta].description}</p>
            <QuizOptions
              alternativas={db.questions[pergunta].alternatives}
              setSelecionado={setSelecionado}
            />
            {check && (
              <ButtonNext onClick={handleClick}>Próxima pergunta</ButtonNext>
            )}
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/AJP2511" />
    </QuizBackground>
  );
}
