import React from 'react'
import { SecondaryBtn } from '../style/mainStyles'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { colors } from '../style/Colors';

const StartPageSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100vh;
    width: 100vw;
    padding: 5px;

    color: ${colors.color1};
    background-color:${colors.bg1};
   
    h1 {
        font-size: 70px;
        /* margin-top: 10vh; */
    }
    h3 {
        font-size: 18px;
        /* margin-bottom: 10vh;  */
    }
    span {
        text-decoration: underline;
        font-weight: bold;
    }
    .btn-wrap-link {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .sign-up-btn {
        width: 100%;
        margin: 70px 70px 10px;
    }
    p {    
        color: ${colors.color1};
        font-family: Roboto;
        font-size: 14px;
        text-align: center;
        margin-left: 80px;
        margin-bottom: 10px;
    }
    .error {
        color: red;
    }

    @media (min-width: 760px) {
        height: 10%;
        width: 100%;
        border-radius: 5px;
        
    }
`;

export default function StartPage() {
    return (<>
        <StartPageSection>

            <div>
                <h1>minimera</h1>
                <h3>Låna saker av folk i din närhet istället för att köpa</h3>
            </div>

            <div>
                <Link to="/signup" className="btn-wrap-link">
                    <SecondaryBtn className="sign-up-btn">BLI MEDLEM</SecondaryBtn>
                </Link>

                <Link to="/login">
                    <p>Är du redan medlem? <span>Logga in</span></p>
                </Link>
            </div>

        </StartPageSection>
    </>)
}
