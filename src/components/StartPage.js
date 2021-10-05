import React from 'react'
import { StyledButton } from '../style/mainStyles'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const TempSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
        padding: 10px;
        border: 1px solid black;
    }
    select {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        padding: 10px;
    }
    & > * {
        margin: 10px;
        padding: 10px;
    }
    }
    span {
        text-decoration: underline;
        font-weight: bold;
    }
    button {
        cursor: pointer;
    }
    a {
        color: black;
    }
    .error {
        color: red;
    }
`;

export default function StartPage() {
    return (<>
        <TempSection>

            <h1>Minimera</h1>
            <h3>Låna saker av folk i din närhet istället för att köpa</h3>

            <Link to="/signup">
                <StyledButton>Bli medlem</StyledButton>
            </Link>

            <Link to="/login">Är du redan medlem? <span>Logga in</span></Link>

        </TempSection>
    </>)
}
