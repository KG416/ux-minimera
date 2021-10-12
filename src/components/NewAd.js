import React, { useRef, useState } from 'react'
import { useMainContext } from '../context/MainContext';
import { db } from '../firebase';
import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router';
import { PrimaryBtn, FormSection } from '../style/mainStyles';

export default function NewAd() {
    const adTitleRef = useRef();
    const adDetailsRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { currentUser } = useMainContext();
    const history = useHistory();

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
            <FormSection>
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
            </FormSection>
        </>
    )
}
