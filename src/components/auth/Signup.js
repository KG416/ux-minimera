import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMainContext } from "../../context/MainContext";
import styled from 'styled-components';
import { db } from "../../firebase";

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
    select {
        display: flex;
        flex-direction: column;
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

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [area, setArea] = useState('center');
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { signup } = useMainContext();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Lösenorden matchar inte");
        }
        try {
            setError("");
            setLoading(true);
            let newUser = await signup(emailRef.current.value, passwordRef.current.value);

            const newUserId = newUser.user.uid;

            // Save name, area & email to firestore
            db.collection("users")
                .doc(newUserId)
                .collection("userInfo")
                .add({
                    name,
                    email: emailRef.current.value,
                    area,
                })

            setLoading(false);
            history.push("/");
        } catch {
            setError("Kunde ej skapa konto");
            setLoading(false);
        }
    }
    return (
        <>
            <TempSection>
                <h1>Bli medlem</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <input placeholder="Namn" type="text" value={name} onChange={e => setName(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Mail"
                            ref={emailRef}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Lösenord"
                            ref={passwordRef}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Repetera lösenord"
                            ref={passwordConfirmRef}
                            required
                        />
                    </div>
                    <div>
                        <label>Stadsdel i Stockholm:</label>
                        <select value={area} onChange={(e) => setArea(e.target.value)}>
                            <option value="north">Norr</option>
                            <option value="east">Östra</option>
                            <option value="west">Västra</option>
                            <option value="south">Söder</option>
                            <option value="center">Centrum</option>
                        </select>
                    </div>

                    <button disabled={loading} type="submit">
                        Sign Up
                    </button>
                </form>
                {error && <div className="error">{error}</div>}
                <Link to="/login">Är du redan medlem? <span>Logga in</span></Link>

                {area}
            </TempSection>
        </>
    );
}
