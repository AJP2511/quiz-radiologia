export default function QuizOptions({
  alternativas,
  selecionado,
  setSelecionado,
}) {
  return (
    <ul>
      {alternativas.map((alternativa, id) => (
        <li key={id}>
          <input
            type="radio"
            name="alternativa"
            id={`altern${id}`}
            value={alternativa}
            onChange={({ target }) => setSelecionado(target.value)}
          />
          <label htmlFor={`altern${id}`}>{alternativa}</label>
        </li>
      ))}
    </ul>
  );
}
