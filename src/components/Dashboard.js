import React, { useState, useEffect } from 'react'
import { useMainContext } from '../context/MainContext';
import { db } from '../firebase';

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

    // get ads from current area
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
        <>
            <h1>Annonser</h1>
            <p>Vald stadsdel:</p>
            <h2>{currentAreaInSwedish}</h2>
            {loading && <p>Loading...</p>}

            {ads ?
                ads.map(ad => (
                    <div key={ad.id}>
                        <h2>{ad.adTitle}</h2>
                        <p>{ad.adDetails}</p>
                    </div>
                ))
                : <p> "No ads available :( After someone has created some, you'll see them here..."</p>
            }
        </>
    )
}
