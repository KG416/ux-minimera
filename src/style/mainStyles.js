import styled, { createGlobalStyle } from 'styled-components/macro';

/* ========================= Global Styles =========================*/
export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    border: none;
    text-decoration: none;
    &:focus {
        outline: none;
    }
}
html {
    background-color: white;
    scroll-behavior: smooth;
}
html, h1, h2 {
    transition: background-color 0.5s ease-in-out;
}
h1 {
    font-size: 3em;
    color: black;
    text-align: center;
    max-width: 100vw;
}
h3 {
    font-size: 1.6em;
    color: black;
    /* margin: 50px; */
    text-align: center;
}

/* Medium */


/* Mobile */
@media (max-width: 760px) {
h1 {
    font-size: 2.6em;
}
h3 {
    font-size: 1.6em;
    /* margin: 50px; */
}
}

`;

/* ========================= Buttons =========================*/
export const StyledButton = styled.button`
    background-color: transparent;
    font-size: 30px;
    margin: 50px;
    height: 60px;
    width: 80%;
    cursor: pointer;
    border: 5px red solid;
`;