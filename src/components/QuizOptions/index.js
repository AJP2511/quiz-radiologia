import styled from "styled-components";

export const FirstContainer = styled.div`
  padding: 0.5rem;
  width: 100%;

  legend {
    margin-bottom: 1rem;
    font-size: 1.125rem;
  }

  label {
    margin-bottom: 1rem;
  }

  fieldset {
    display: flex;
    flex-direction: column;
  }
`;

export default function QuizOptions({
  title,
  description,
  answer,
  alternatives,
  onChange,
  value,
  id,
  active,
}) {
  if (active === false) return null;

  return (
    <FirstContainer>
      <fieldset>
        <legend>{title}</legend>
        {alternatives.map((alternative) => (
          <label key={alternative}>
            <input
              type="radio"
              id={id}
              checked={value === alternative}
              value={alternative}
              onChange={onChange}
            />
            {alternative}
          </label>
        ))}
      </fieldset>
    </FirstContainer>
  );
}
