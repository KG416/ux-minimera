import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useMainContext } from '../context/MainContext';
import styled from 'styled-components';
import { StyledButton } from '../style/mainStyles';

const TempSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & input {
        padding: 10px;
    }
    & > * {
        margin: 10px;
        padding: 10px;
    }
    }
`;

export default function Profile() {
    const [error, setError] = useState("");
    const { logout, currentUser } = useMainContext();
    const history = useHistory();

    const toAdds = () => {
        history.push("/myads");
    }

    async function handleLogout() {
        setError("");

        try {
            await logout();
            history.push("/");
        } catch {
            setError("Utloggning misslyckades");
        }
    }

    return (
        <>
            <TempSection>
                <h1>Profil</h1>

                <p>user-id: <br /> {currentUser.uid}</p>

                <StyledButton onClick={toAdds}>Mina annonser</StyledButton>
                <StyledButton onClick={handleLogout}>LOGGA UT</StyledButton>
                {error && <div>{error}</div>}
            </TempSection>
        </>
    )
}
