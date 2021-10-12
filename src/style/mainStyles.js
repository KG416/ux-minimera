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
    transition: 0.2s;

    &:hover {
        box-shadow: 1px 1px 1px 1px rgba(163,163,163,0.5);
    }
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
        /* outline: 2px green solid; */
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: 30px 0 30px;

    }
    .adCard {
        /* outline: 2px solid brown; */
        background-color: ${colors.bg2};
        box-shadow: 1px 1px 1px 1px rgba(163,163,163,0.5);

        font-family: 'Roboto', sans-serif;
        cursor: pointer;
        border-radius: 1px;
        margin: 5px;
        display: flex;
        flex-direction: column;

        height: 21vh;
        width: 21vh;
        padding: 8px;
        
        &:hover {
        box-shadow: 1px 1px 1px 1px rgba(163,163,163,1);
        }

        .top-row {
            flex-grow: 200;
            /* outline: 2px solid green; */
            width: 100%;
            display: grid;
            grid-template-columns: 90% 10%;
        }

        h2 {
            /* outline: 2px solid black; */
            color: ${colors.color2};

            text-align: left;
            margin: 0 0 10px;

            width: 95%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .deleteBtn {
            /* outline: 2px solid black; */
            display: flex;
            justify-self: center;
            font-size: 16px;
            cursor: pointer;
            background: transparent;
            height: 16px;
            &:hover {
                color: grey;
            }
        }

        .details {
            /* outline: 2px solid blue; */
            color: ${colors.color2};

            flex-grow: 200;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 7; /* number of lines to show */
            -webkit-box-orient: vertical;
            margin-bottom: 5px;
            /* height: 67%; */
        }

        .author {
            color: ${colors.color2};
            

            flex-grow: 1;
            margin-top: 10px;
            font-weight: bold;
            font-style: italic;
        }
    }

    /* iPhone 5 */
    @media (max-width: 320px) {
        .details {
            height: 42px;
        }
        .adsContainer {
            margin-bottom: 15vh;
        }
    }

    /* Desktop view */
    @media (min-width: 700px) {
        .adCard {
            height: 200px;
            width: 200px;
        }
    }

`;

export const FormSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 90vh;

    form {
    font-family: 'Roboto';
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
        /* background-color: blue; */
        display: flex;
        flex-direction: column;
        }

    .label-wrap {
        display: inline-block;
        }

    label {
        display: inline-block;
        font-size: 12px;
        padding: 0 6px 0;
        margin-left: 5px;
        position: relative;
        top: 8px;
        background-color: white;
        }

    input {
        border: 1px solid grey;
        border-radius: 5px;
        font-size: 16px;
        width: 80vw;
        padding: 16px;
            &:focus {
                outline: 2px solid ${colors.bg1};
            }
        }

    textarea {
        border: 1px solid grey;
        border-radius: 5px;
        font-family: 'Roboto';
        font-size: 16px;
        width: 80vw;
        height: 28vh;
        text-align: bottom;
        padding: 16px;
            &:focus {
                outline: 2px solid ${colors.bg1};
            }
        }
    }
    
    span {
        text-decoration: underline;
        font-weight: bold;
    }

    button {
        cursor: pointer;
        &:focus {
            color: ${colors.bg1};
            background-color: ${colors.color1};
            outline: 2px solid ${colors.bg1};
            box-shadow: 5px 5px 15px 5px rgba(163,163,163,0.5);
        }
    }

    a {
        color: black;
        &:focus {
            color: ${colors.bg1};
            background-color: ${colors.color1};
            outline: 2px solid ${colors.bg1};
            box-shadow: 5px 5px 15px 5px rgba(163,163,163,0.5);
        }
    }

    .error {
        color: red;
    }

    /* Desktop view */
    @media (min-width: 700px) {
        height: 100%;

        input {
        max-width: 35vw;
        }
        textarea {
        max-width: 35vw;
        }
    }
`;