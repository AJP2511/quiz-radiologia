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

export const MsgFinal = styled.div`
  text-align: center;
  font-size: 1.5rem;
  height: 200px;
`;

export const ButtonNext = styled.div`
  width: 100%;
  padding: 1rem;
  button {
    color: #000;
    width: 100%;
    height: 36px;
    border-radius: 4px;
    background-color: #fb1;
    font-weight: bold;
    text-align: center;
    padding: 10px 1rem;
    border: none;
  }

  button:hover {
    box-shadow: 0 0 0 3px #459bd8;
  }
`;

export default function quiz() {
  const [slide, setSlide] = React.useState(0);
  const [resultado, setResultado] = React.useState(false);
  const [foto, setFoto] = React.useState(0);
  const [respostas, setRespostas] = React.useState({
    p1: "",
    p2: "",
    p3: "",
    p4: "",
    p5: "",
  });
  const [pontos, setPontos] = React.useState(0);

  function resultadoFinal() {
    const corretas = db.questions.filter(
      ({ id, answer }) => respostas[id] === answer
    );
    setPontos(corretas.length);
  }

  function handleClick() {
    if (slide < db.questions.length - 1) {
      setSlide(slide + 1);
      setFoto(foto + 1);
      console.log(respostas);
    } else {
      setSlide(slide + 1);
      setResultado(!resultado);
      resultadoFinal();
      console.log(respostas);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange({ target }) {
    setRespostas({ ...respostas, [target.id]: target.value });
  }
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            {resultado ? (
              <h1>Resultado</h1>
            ) : (
              <h1>{`Pergunta ${slide + 1} de 5`}</h1>
            )}
          </Widget.Header>
          <Widget.Content>
            {!resultado && (
              <Image
                src={db.questions[foto].image}
                alt="ilustracao"
                layout="responsive"
                width={400}
                height={200}
              />
            )}
          </Widget.Content>
          {resultado ? (
            <MsgFinal>
              {`Parabéns ${window.localStorage.getItem("jogador")} você fez ${
                pontos * 20
              }`}{" "}
              pontos!
            </MsgFinal>
          ) : (
            <form onSubmit={handleSubmit}>
              {db.questions.map((question, index) => (
                <QuizOptions
                  active={slide === index}
                  key={question.id}
                  value={respostas[question.id]}
                  onChange={handleChange}
                  slid={slide}
                  setSlide={setSlide}
                  db={db}
                  {...question}
                />
              ))}
              <ButtonNext>
                <button onClick={handleClick}>PRÓXIMO</button>
              </ButtonNext>
            </form>
          )}
        </Widget>
        {/* <Footer /> */}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/AJP2511" />
    </QuizBackground>
  );
}
