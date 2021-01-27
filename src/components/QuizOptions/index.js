import styled from "styled-components";

export const ListItem = styled.li`
  padding: 0.5rem;

  label {
    margin-left: 0.5rem;
    font-size: 1.125rem;
  }
`;

export default function QuizOptions({ alternativas, setSelecionado }) {
  return (
    <>
      <ul>
        {alternativas.map((alternativa, id) => (
          <ListItem key={id}>
            <input
              type="radio"
              name="alternativa"
              id={`altern${id}`}
              value={alternativa}
              onChange={({ target }) => setSelecionado(target.value)}
            />
            <label htmlFor={`altern${id}`}>{alternativa}</label>
          </ListItem>
        ))}
      </ul>
    </>
  );
}
