import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useMainContext } from '../context/MainContext';
import styled from 'styled-components';
import { PrimaryBtn } from '../style/mainStyles';
import useUserInfo from '../hooks/useUserInfo';
import { colors } from '../style/Colors';

const ProfileSection = styled.section`

    display: flex;
    flex-direction: column;
    align-items: center;
    
    .info-card-wrap {
        border-radius: 3px;
        padding: 10px 0 10px;
        box-shadow: 5px 5px 15px 5px rgba(163,163,163,0.5);
    }

    .info-card {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        margin: 5px;
        padding: 5px;
        width: 70vw;
        max-width: 300px;

        p {
            color: ${colors.color3};
            font-size: medium;
            margin: 0 0 2px; 
        }

        h2 {
            font-size: x-large;
        }
    }

    /* iPhone 5, 6, 7, 8 */
    @media (max-width: 375px) {
        button {
            margin: 20px;
        }
    }

`;

export default function Profile() {
    const [error, setError] = useState("");
    const { logout, currentUser } = useMainContext();
    const history = useHistory();
    const { name, area, email } = useUserInfo();

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
            <ProfileSection>
                <h1>Profil</h1>

                {name, area, email ?
                    <div className="info-card-wrap">
                        <div className="info-card">
                            <p>Namn</p>
                            <h2>{name}</h2>
                        </div>

                        <div className="info-card">
                            <p>Vald stadsdel</p>
                            <h2>{area}</h2>
                        </div>

                        <div className="info-card">
                            <p>Mail</p>
                            <h2>{email}</h2>
                        </div>
                    </div>
                    : <p>Laddar...</p>}

                {error && <div>{error}</div>}

                <PrimaryBtn onClick={toAdds}>MINA ANNONSER</PrimaryBtn>
                <PrimaryBtn onClick={handleLogout}>LOGGA UT</PrimaryBtn>
            </ProfileSection>
        </>
    )
}
