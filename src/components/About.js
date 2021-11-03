import React from 'react'
import styled from 'styled-components';
import { colors } from '../style/Colors';

const ProfileSection = styled.section`

    /* outline: 2px red solid; */

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    /* Prevent elements from hiding behind nav in mobile view */
    padding-bottom: 100px;

    h2 {
        font-size: medium;
        margin: 0 0 7px;
    }

    p {
        color: ${colors.color3};
        font-size: small;
        margin: 0 0 2px;
        & > span {
            font-style: italic;
        }
    }

    .info-card-wrap {
        font-family: Roboto;
        border-radius: 3px;
        padding: 10px 0 10px;
        box-shadow: 5px 5px 15px 5px rgba(163,163,163,0.5);
        margin: 5px;
    }

    .info-card {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        margin: 5px;
        padding: 5px;
        width: 76vw;
        max-width: 290px;
    }

    .btn-wrap {
        text-align: center;
    }

    /* iPhone 5, 6, 7, 8 */
    @media (max-width: 375px) {

        height: 90vh;

        button {
            margin: 20px;
        }
    }

`;

export default function About() {
    return (<>
        <h1>Hur funkar det?</h1>
        <ProfileSection>

            <div className="info-card-wrap">
                <div className="info-card">
                    <h2>Kom igång</h2>
                    <p>Gå till annonser för att se alla tillgängliga annonser i ditt valda område.</p>
                </div>
            </div>

            <div className="info-card-wrap">
                <div className="info-card">
                    <h2>Låna</h2>
                    <p>Tryck på en annons för att se mer detaljer. <br /> <br />
                        När du klickar på "kontakta annonsör" ser du mailadressen till annonsören.
                    </p>
                </div>
            </div>

            <div className="info-card-wrap">
                <div className="info-card">
                    <h2>Låna ut</h2>
                    <p>Gå till "lägg till annons". <br /> <br />
                        Ge din annons en titel och en beskrivning. <br /> <br />
                        Välj "lägg till annons". <br /> <br />
                        <span>
                            Mailadressen du angav då du blev medlem blir automatiskt den mailadress som du kontaktas på om någon är intresserad av din annons.
                        </span>
                    </p>
                </div>
            </div>

        </ProfileSection>
    </>)
}
