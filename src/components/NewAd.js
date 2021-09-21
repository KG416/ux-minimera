import React, { useRef, useState, useEffect } from 'react'
import { useMainContext } from '../context/MainContext';
import styled from 'styled-components';
import { db } from '../firebase';
import { v4 as uuid } from 'uuid'

const TempSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
        padding: 10px;
        border: 1px solid black;
    }
    .ad-details {
        text-align: start;
        height: 100px;
        border: 1px solid black;
        padding: 10px;
    }
    & > * {
        margin: 10px;
        padding: 10px;
    }
    }
    span {
        text-decoration: underline;
        font-weight: bold;
    }
    button {
        cursor: pointer;
    }
    a {
        color: black;
    }
    .error {
        color: red;
    }
`;

export default function NewAd() {
    const adTitleRef = useRef();
    const adDetailsRef = useRef();
    const [area, setArea] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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
                setArea(areaIs);
            });
    }, [currentUser.uid]);

    // new add
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);

            let newId = uuid();

            // add to firestore
            db.collection("ads")
                .doc(newId)
                .set({
                    id: newId,
                    authorId: currentUser.uid,
                    authorEmail: currentUser.email,
                    adTitle: adTitleRef.current.value,
                    adDetails: adDetailsRef.current.value,
                    area,
                })

            alert('Klart! Gå till annonser för att se din nya annons :)')
            adTitleRef.current.value = "";
            adDetailsRef.current.value = "";

        } catch {
            setError("Kunde ej skapa annons");
        }
        setLoading(false);

    }

    return (
        <>
            <TempSection>
                <h1>Ny annons</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Vad vill du låna ut?"
                            ref={adTitleRef}
                            required
                        />
                    </div>
                    <div>
                        <input className="ad-details"
                            type="textarea"
                            placeholder="Detaljer"
                            ref={adDetailsRef}
                            required
                        />
                    </div>

                    <button disabled={loading} type="submit">
                        Lägg till annons
                    </button>
                </form>
                {error && <div className="error">{error}</div>}
            </TempSection>
        </>
    )
}
