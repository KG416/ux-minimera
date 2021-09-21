import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import styled from 'styled-components';
import { useMainContext } from '../context/MainContext';

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

export default function MyAds() {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useMainContext();

    const adsInFb = db.collection("ads");
    const currentUserId = currentUser.uid;

    // [] Make into a hook later?
    const getUserAds = () => {
        setLoading(true)
        adsInFb
            // only add ads from current user
            .where("authorId", "==", currentUserId)
            .onSnapshot(querySnapshot => {
                const items = []
                querySnapshot.forEach(doc => {
                    items.push(doc.data())
                })
                setAds(items)
                setLoading(false)
            })
    }

    // delete ad
    const deleteAd = ad => {
        adsInFb
            .doc(ad.id)
            .delete()
            .catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        getUserAds()
    }, [])

    return (
        <StyledDiv>
            <h1>Mina annonser</h1>

            {loading && <p>Loading...</p>}

            {ads ?
                ads.map(ad => (
                    <div key={ad.id} className="adCard">
                        <h2>{ad.adTitle}</h2>
                        <p>{ad.adDetails}</p>
                        <button onClick={() => deleteAd(ad)}>Ta bort</button>
                    </div>
                ))
                : <p> "No ads :( After you've created them, you'll see them here..."</p>
            }
        </StyledDiv>
    )
}
