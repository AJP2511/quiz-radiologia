import styled from "styled-components";
import db from "../db.json";
import Widget from "../src/components/Widget";
import QuizLogo from "../src/components/QuizLogo";
import QuizBackground from "../src/components/QuizBackground";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import QuizOptions from "../src/components/QuizOptions";

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

export default function quiz() {
  const [nome, setNome] = React.useState("");
  const [pergunta, setPergunta] = React.useState(0);
  const [selecionado, setSelecionado] = React.useState(null);
  const [pontos, setPontos] = React.useState(0);

  function HandleClick() {
    const indexCorrecao = db.questions[pergunta].answer;
    const ArrayRespostas = db.questions[pergunta].alternatives;
    if (selecionado == ArrayRespostas[indexCorrecao]) {
      setPontos(pontos + 1);
    }
    setPergunta(pergunta + 1);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.questions[pergunta].title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.questions[pergunta].description}</p>
            <QuizOptions
              alternativas={db.questions[pergunta].alternatives}
              selecionado={selecionado}
              setSelecionado={setSelecionado}
            />
            <button onClick={HandleClick}>Próxima pergunta</button>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/AJP2511" />
    </QuizBackground>
  );
}
