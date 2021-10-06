import styled, { createGlobalStyle } from 'styled-components/macro';
import { colors } from './Colors';


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
html, body {
    background-color: white;
    scroll-behavior: smooth;
    max-width: 100%;
    overflow-x: hidden;
}
html, h1, h2 {
    transition: background-color 0.5s ease-in-out;
}
h1 {
    text-align: center;
    font-size: 2.6em;
    margin: 15px;
}
h2 {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}
h3 {
    font-size: 14px;
    text-align: center;
    /* margin: 50px; */
}
p {
    font-size: 12px;
}
/* Desktop view */

@media (min-width: 760px) {
    h1 {
        font-size: 3em;
        max-width: 100vw;
    }

    h2 {
        font-size: 16px;
        max-width: 100vw;
    }

    h3 {
        font-size: 14px;
        max-width: 100vw;
    }
}

`;

/* ========================= Buttons =========================*/
export const PrimaryBtn = styled.button`
    background-color: ${colors.bg1};
    color: ${colors.color1};

    border-radius: 3px;
    font-size: 20px;
    /* font-weight: 600; */
    /* letter-spacing: 1.25px; */
    margin: 50px;
    height: 60px;
    max-width: 300px;
    width: 85%;
    cursor: pointer;
`;

export const SecondaryBtn = styled.button`
    background-color: ${colors.bg2};
    color: ${colors.bg1};

    border-radius: 3px;
    font-size: 20px;
    /* font-weight: 600; */
    /* letter-spacing: 1.25px; */
    margin: 50px;
    height: 60px;
    max-width: 300px;
    width: 85%;
    cursor: pointer;
`;