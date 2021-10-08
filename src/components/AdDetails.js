import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { db } from '../firebase'
import styled from 'styled-components'
import { colors } from '../style/Colors';
import { PrimaryBtn } from '../style/mainStyles';

// temp styling
const DetailsSection = styled.section`
    .detailsContainer {
        /* outline: 1px solid green; */
        
    }
    .adCard {
        background-color: ${colors.bg2};
        box-shadow: 1px 1px 1px 1px rgba(163,163,163,0.5);

        font-family: 'Roboto', sans-serif;
        border-radius: 1px;
        margin: 5px;
        display: flex;
        flex-direction: column;

        height: 60vh;
        width: 90%;
        padding: 8px;
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

    return (
        <div className="detailsContainer">
            <DetailsSection>
                {loading && <p>Loading...</p>}

                {ad && ad.map(ad => (
                    <div key={ad.id} className="adCard">
                        <h1>{ad.adTitle}</h1>
                        <p>{ad.adDetails}</p>
                        <p>Annonsör: {name}</p>

                        {/* display mailto link if btn is clicked */}
                        {contactClicked ?
                            <a href={`mailto:${email}`}>{email}</a>
                            :
                            <PrimaryBtn onClick={clickedOnContact}>Kontakta annonsör</PrimaryBtn>
                        }
                    </div>
                ))
                }
            </DetailsSection >
        </div>
    )
}
