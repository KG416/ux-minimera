import React, { useRef, useState } from 'react'
import { useMainContext } from '../context/MainContext';
import styled from 'styled-components';
import { db } from '../firebase';
import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router';

const TempSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    form {
    font-family: 'Roboto';
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    label {
        font-size: 12px;
        padding: 0 6px 0;
        margin-left: 5px;
        position: relative;
        top: 8px;
        background-color: white;
    }
    input {
        z-index: 8;
        border: 1px solid grey;
        border-radius: 5px;
        font-size: 16px;
        width: 260px;
        padding: 16px;
    }
    textarea {
        border: 1px solid grey;
        border-radius: 5px;
        font-family: 'Roboto';
        font-size: 16px;
        width: 260px;
        text-align: bottom;
        height: 150px;
        padding: 16px;
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
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { currentUser } = useMainContext();
    const history = useHistory();

    // get area & name from firestore


    // new add
    const handleSubmit = async e => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);

            let area;
            let authorName;

            await db.collection("users")
                .doc(currentUser.uid)
                .collection("userInfo")
                .get()
                .then((snapshot) => {
                    let documents = [];
                    snapshot.docs.forEach((doc) => {
                        documents.push(doc.data());
                    });
                    area = documents[0].area;
                    authorName = documents[0].name;
                });

            let newId = uuid();

            // add to firestore
            await db.collection("ads")
                .doc(newId)
                .set({
                    id: newId,
                    authorId: currentUser.uid,
                    authorEmail: currentUser.email,
                    authorName,
                    area,
                    adTitle: adTitleRef.current.value,
                    adDetails: adDetailsRef.current.value,
                })
            setLoading(false);
            //alert('Annons tillagd!')
            history.push("/myads");
        } catch {
            setLoading(false);
            setError("Kunde ej skapa annons");
        }
    }

    return (
        <>
            <TempSection>
                <h1>Ny annons</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Vad vill du låna ut?</label>
                        <input
                            type="text"
                            placeholder="Titel"
                            maxLength="30"
                            ref={adTitleRef}
                            required
                        />
                    </div>
                    <div>
                        <label>Detaljer</label>
                        <textarea
                            type="textarea"
                            placeholder="Beskriv ditt objekt"
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
