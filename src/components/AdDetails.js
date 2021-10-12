import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { db } from '../firebase'
import styled from 'styled-components'
import { colors } from '../style/Colors';
import { PrimaryBtn } from '../style/mainStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DetailsSection = styled.section`
        /* outline: 1px solid green; */
        display: flex;
        justify-content: center;
    
    .adCard {
        background-color: ${colors.bg2};
        box-shadow: 1px 1px 1px 1px rgba(163,163,163,0.5);

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        font-family: 'Roboto', sans-serif;
        border-radius: 3px;
        margin: 20px 20px;

        height: 80vh;
        width: 90%;
        padding: 20px;
    }

    .adCard > * {
        /* outline: 5px red solid; */
    }

    .topRow {
            /* outline: 1px solid red; */
            width: 100%;
            height: 5vh;
            display: grid;
            grid-template-columns: 85% 15%;
            
            h2 {
                text-align: start;
                /* display: flex;
                align-self: center; */
                font-size: large;
            }

            .closeCard {
                /* outline: 1px solid red; */
                display: flex;
                align-self: flex-start;
                justify-self: flex-end;
                cursor: pointer;
                font-size: 24px;
                background: transparent;
            }
        }

        .details {
            font-size: small;
            width: 100%;
        }

        .author {
            font-weight: bold;
            font-size: small;
            width: 100%;
        }

        /* When contact btn is clicked */
        a {
            background-color: ${colors.bg1};
            color: ${colors.color1};

            display: flex;
            justify-content: center;
            align-items: center;

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
        }
        @media (min-width: 700px) {
            .adCard {
                padding: 50px;
            }
        }
`;

export default function AdDetails() {
    const { id } = useParams()
    const adsInFb = db.collection("ads");
    const [ad, setAd] = useState()
    const [loading, setLoading] = useState(false)
    const [contactClicked, setContactClicked] = useState(false)
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const history = useHistory()

    // get email from db
    useEffect(() => {
        const unsubscribe = db.collection("ads")
            // only add ads from current user
            .where("id", "==", id)
            .onSnapshot(querySnapshot => {
                const items = []
                querySnapshot.forEach(doc => {
                    items.push(doc.data())
                })
                setEmail(items[0].authorEmail)
                setName(items[0].authorName)
            })
        return () => unsubscribe();
    }, []);

    // get ads
    useEffect(() => {
        setLoading(true);

        const unsubscribe =
            adsInFb
                .where("id", "==", id)
                .onSnapshot(querySnapshot => {
                    const items = []
                    querySnapshot.forEach(doc => {
                        items.push(doc.data())
                    })
                    setAd(items)
                    setLoading(false)
                })
        return () => unsubscribe();
    }, [])

    const clickedOnContact = () => {
        setContactClicked(contactClicked => !contactClicked)
    }

    const closeAd = () => {
        history.push("/");
    }

    return (
        <DetailsSection>
            {loading && <p>Loading...</p>}

            {ad && ad.map(ad => (
                <div key={ad.id} className="adCard">
                    <div className="topRow">
                        <h2>{ad.adTitle}</h2>
                        <button className="closeCard" onClick={closeAd}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <p className="details">{ad.adDetails}</p>
                    <p className="author">Annonsör: {name}</p>

                    {/* display mailto link if btn is clicked */}
                    {contactClicked ?
                        <a href={`mailto:${email}`}>{email}</a>
                        :
                        <PrimaryBtn onClick={clickedOnContact}>KONTAKTA ANNONSÖR</PrimaryBtn>
                    }
                </div>
            ))
            }
        </DetailsSection >
    )
}
