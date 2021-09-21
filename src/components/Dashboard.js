import React, { useState, useEffect } from 'react'
import { useMainContext } from '../context/MainContext';
import { db } from '../firebase';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// temp styling
const StyledDiv = styled.div`
    .adCard {
        cursor: pointer;
        border: 2px solid red;
        margin: 5px;
        padding: 5px;
        &:hover {
        background: lightgray;
    }
    }
`;

export default function Dashboard() {
    const [currentArea, setCurrentArea] = useState("");
    const [currentAreaInSwedish, setCurrentAreaInSwedish] = useState("");
    const { currentUser } = useMainContext();
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(false);

    const adsInFb = db.collection("ads");

    // get area from firestore
    useEffect(() => {
        db.collection("users")
            .doc(currentUser.uid)
            .collection("userInfo")
            .get()
            // This is async, so it returns a promise
            .then((snapshot) => {
                let documents = [];
                snapshot.docs.forEach((doc) => {
                    documents.push(doc.data());
                });
                setCurrentArea(documents[0].area)

                // translate area to swedish for rendering
                if (currentArea === 'south') {
                    setCurrentAreaInSwedish('Söder');
                } else if (currentArea === 'center') {
                    setCurrentAreaInSwedish('Centrum');
                } else if (currentArea === 'north') {
                    setCurrentAreaInSwedish('Norr');
                } else if (currentArea === 'west') {
                    setCurrentAreaInSwedish('Väster');
                } else if (currentArea === 'east') {
                    setCurrentAreaInSwedish('Öster');
                }
            });
    }, [currentUser.uid, currentArea]);

    // get ads
    const getAllAds = () => {
        setLoading(true)
        adsInFb
            // only ads from current area
            .where("area", "==", currentArea)
            .onSnapshot(querySnapshot => {
                const items = []
                querySnapshot.forEach(doc => {
                    items.push(doc.data())
                })
                setAds(items)
                setLoading(false)
            })
    }

    useEffect(() => {
        getAllAds()
    }, [currentArea])

    return (
        <StyledDiv>
            <h1>Annonser</h1>
            <p>Vald stadsdel:</p>
            <h2>{currentAreaInSwedish}</h2>
            {loading && <p>Loading...</p>}

            {ads ?
                ads.map(ad => (
                    <div key={ad.id} className="adCard">
                        <Link to={`/addetails/${ad.id}`}>
                            <h2>{ad.adTitle}</h2>
                            <p>{ad.adDetails}</p>
                            <p>Annonsör: {ad.authorName}</p>
                        </Link>
                    </div>
                ))
                : <p> "No ads available :( After someone has created some, you'll see them here..."</p>
            }
        </StyledDiv>
    )
}
