import React, { useState, useEffect } from 'react'
import { useMainContext } from '../context/MainContext';
import { db } from '../firebase';

export default function Dashboard() {
    const [currentArea, setCurrentArea] = useState("");
    const { currentUser } = useMainContext();

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
                let areaIs = documents[0].area;

                if (areaIs === 'south') {
                    setCurrentArea('Söder');
                } else if (areaIs === 'center') {
                    setCurrentArea('Centrum');
                } else if (areaIs === 'north') {
                    setCurrentArea('Norr');
                } else if (areaIs === 'west') {
                    setCurrentArea('Väster');
                } else if (areaIs === 'east') {
                    setCurrentArea('Öster');
                }

            });
    }, [currentUser.uid]);

    // get ads from current area

    return (
        <>
            <h1>Annonser</h1>
            <p>Vald stadsdel:</p>
            <h2>{currentArea}</h2>
        </>
    )
}
