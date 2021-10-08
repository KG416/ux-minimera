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

/* ========================= Sections =========================*/
export const AdsSection = styled.section`
    h1 {
        margin: 10px 0 0;
    }
    .area {
        font-size: 16px;
        text-align: center;

        span {
            font-weight: bold;
        }
    }
    .adsContainer {
        outline: 2px green solid;
        display: grid;
        grid-template-columns: 50% 50%;
        margin: 30px 0 30px;

    }
    .adCard {
        font-family: 'Roboto', sans-serif;
        cursor: pointer;
        outline: 2px solid red;
        margin: 5px;
        padding: 1px;
        display: flex;
        justify-content: center;

        &:hover {
        background: lightgray;
        }

        .top-row {
            /* outline: 2px solid green; */
            width: 100%;
            display: grid;
            grid-template-columns: 95% 5%;
        }

        h2 {
            outline: 2px solid black;
            text-align: left;
            color: darkgreen;
            margin: 0 0 5px;
        }

        .deleteBtn {
            font-size: 18px;
            cursor: pointer;
            background: transparent;
            &:hover {
                color: grey;
            }
        }

        .details {
            outline: 2px solid blue;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 8; /* number of lines to show */
            -webkit-box-orient: vertical;
            margin-bottom: 5px;
        }

        /*
        a = Dashboard.js 
        .innerAdContainer = MyAds.js
        */
        a, .innerAdContainer {
            /* outline: 2px turquoise solid; */
            height: 20vh;
            width: 20vh;
            padding: 2px;
            display: flex;
            flex-direction: column;
            
        }

        .author {
            color: darkred;
            font-weight: bold;
            font-style: italic;
        }
    }

    /* iPhone 5 */
    @media (max-width: 320px) {
        /* background: red; */
        .details {
            height: 42px;
        }
    }

    /* Desktop view */
    @media (min-width: 700px) {
        .adsContainer {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }
        .adCard {
            height: 200px;
            width: 200px;
        }
    }

`;