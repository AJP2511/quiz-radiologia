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
  const [pergunta, setPergunta] = React.useState(0);
  const [slide, setSlide] = React.useState(0);
  const [respostas, setRespostas] = React.useState({
    p1: "",
    p2: "",
    p3: "",
    p4: "",
    p5: "",
  });

  function resultadoFinal() {
    console.log("oi");
  }

  function handleClick() {
    if (slide - db.questions.length - 1) {
      setSlide(slide + 1);
    } else {
      setSlide(slide + 1);
      resultadoFinal();
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
            <h1>{`Pergunta ${slide + 1} de 5`}</h1>
          </Widget.Header>
          <Widget.Content>
            <Image
              src={db.questions[slide].image}
              alt="ilustracao"
              layout="responsive"
              width={400}
              height={200}
            />
            <p>{db.questions[pergunta].description}</p>
          </Widget.Content>
          <form onSubmit={handleSubmit}>
            {db.questions.map((question, index) => (
              <QuizOptions
                active={slide === index}
                key={question.id}
                value={respostas[question.id]}
                onChange={handleChange}
                {...question}
              />
            ))}
            <ButtonNext>
              <button onClick={handleClick}>PRÓXIMO</button>
            </ButtonNext>
          </form>
        </Widget>
        {/* <Footer /> */}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/AJP2511" />
    </QuizBackground>
  );
}
