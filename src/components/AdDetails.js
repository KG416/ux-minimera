import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { db } from '../firebase'
import styled from 'styled-components'

// temp styling
const StyledDiv = styled.div`
    .adCard {
        border: 2px solid red;
        margin: 5px;
        padding: 5px;
    }
    button {
        cursor: pointer;
        padding: 3px;
        margin: 3px;
        width: 80px;
        &:hover {
        border: 1px solid black;
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

    // get email from db
    useEffect(() => {
        db.collection("ads")
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
    }, []);

    // get ads
    useEffect(() => {
        setLoading(true)
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
    }, [])

    const clickedOnContact = () => {
        setContactClicked(contactClicked => !contactClicked)
    }

    return (
        <StyledDiv>
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
                        <button onClick={clickedOnContact}>Kontakta annonsör</button>
                    }
                </div>
            ))
            }
        </StyledDiv >
    )
}
