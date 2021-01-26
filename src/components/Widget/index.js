import styled from "styled-components";

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => {
    return theme.colors.mainBg;
  }};
  border-radius: 4px;
  overflow: hidden;
  h1,
  h2,
  h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  justify-content: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};

  * {
    margin: 0;
  }

  h1 {
    font-size: 1.5rem;
  }
`;

Widget.Content = styled.div`
  p {
    text-align: center;
  }
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

export default Widget;

Widget.Nome = styled.div`
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
  a {
    display: block;
    text-decoration: none;
    color: #000;
    width: 279px;
    height: 36px;
    margin-top: 25px;
    border-radius: 4px;
    background-color: #fb1;
    font-weight: bold;
    letter-spacing: 5px;
    text-align: center;
    padding: 10px 1rem;
  }

  @media screen and (max-width: 500px) {
    a {
      width: 100%;
    }
  }
`;
