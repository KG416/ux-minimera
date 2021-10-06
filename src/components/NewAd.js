import React, { useRef, useState } from 'react'
import { useMainContext } from '../context/MainContext';
import styled from 'styled-components';
import { db } from '../firebase';
import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router';
import { PrimaryBtn } from '../style/mainStyles';

const NewAdSection = styled.section`
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

    div {
    /* background-color: blue; */
    display: flex;
    flex-direction: column;
    }

    .label-wrap {
        display: inline-block;
    }

    label {
        display: inline-block;
        font-size: 12px;
        padding: 0 6px 0;
        margin-left: 5px;
        position: relative;
        top: 8px;
        background-color: white;
    }
    input {
        border: 1px solid grey;
        border-radius: 5px;
        font-size: 16px;
        width: 80vw;
        padding: 16px;
    }
    textarea {
        border: 1px solid grey;
        border-radius: 5px;
        font-family: 'Roboto';
        font-size: 16px;
        width: 80vw;
        height: 28vh;
        text-align: bottom;
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
    @media (min-width: 760px) {
        input {
        max-width: 40vw;
        }
        textarea {
        max-width: 40vw;
        }
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
            <NewAdSection>
                <h1>Ny annons</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="label-wrap">
                            <label>Vad vill du låna ut?</label>
                        </div>
                        <input
                            type="text"
                            placeholder="Titel"
                            maxLength="30"
                            ref={adTitleRef}
                            required
                        />
                    </div>
                    <div>
                        <div className="label-wrap">
                            <label>Detaljer</label>
                        </div>
                        <textarea
                            type="textarea"
                            placeholder="Beskriv ditt objekt"
                            ref={adDetailsRef}
                            required
                        />
                    </div>

                    <PrimaryBtn disabled={loading} type="submit">
                        LÄGG TILL ANNONS
                    </PrimaryBtn>
                </form>
                {error && <div className="error">{error}</div>}
            </NewAdSection>
        </>
    )
}
