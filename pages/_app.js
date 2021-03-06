import { createGlobalStyle, ThemeProvider } from "styled-components";
import Head from "../src/components/Head";
import db from "../db.json";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;

  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const theme = db.theme;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head
        title="Quiz Radiologia - DevAJ"
        bg={db.bg}
        description={db.description}
      />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
