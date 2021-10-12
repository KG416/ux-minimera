import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMainContext } from "../../context/MainContext";
import styled from 'styled-components';
import { db } from "../../firebase";
import { FormSection, PrimaryBtn } from "../../style/mainStyles";
import { colors } from "../../style/Colors";

const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
        /* padding: 10px; */
        border: 1px solid black;
        &:focus {
            outline: 2px solid ${colors.bg1};
        }
    }
    .areaWrap {
        width: 98%;
    }
    select {
        border: 1px solid grey;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        padding: 16px;
        &:focus {
            outline: 2px solid ${colors.bg1};
        }
    }

    & > * {
        margin: 5px;
        padding: 5px;
    }

    @media (min-width: 700px) {
        .areaWrap {
        width: 99%;
    }
    }
`;

const InfoDiv = styled.div`
    font-family: Roboto;

    .toLoginWrap {
        /* outline: 1px solid red; */

        display: flex;
        flex-direction: row;
        justify-self: center;
        align-items: center;
    }

    p {
        font-size: 16px;
        margin-right: 5px;
    }

    a {
        text-decoration: underline;
        font-weight: bold;
        cursor: pointer;
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
            <FormSection>
                <h1>Bli medlem</h1>

                <SignupForm onSubmit={handleSubmit}>
                    <div>
                        <div className="label-wrap">
                            <label>Namn</label>
                        </div>
                        <input placeholder="För- och efternamn" type="text" value={name} onChange={e => setName(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <div className="label-wrap">
                            <label>Mail</label>
                        </div>
                        <input
                            type="email"
                            placeholder="Ange din mailadress"
                            ref={emailRef}
                            required
                        />
                    </div>

                    <div>
                        <div className="label-wrap">
                            <label>Lösenord</label>
                        </div>
                        <input
                            type="password"
                            placeholder="Ange önskat lösenord"
                            ref={passwordRef}
                            required
                        />
                    </div>

                    <div>
                        <div className="label-wrap">
                            <label>Repetera lösenord</label>
                        </div>
                        <input
                            type="password"
                            placeholder="Repetera önskat lösenord"
                            ref={passwordConfirmRef}
                            required
                        />
                    </div>

                    <div className="areaWrap">
                        <div className="label-wrap">
                            <label>Välj stadsdel:</label>
                        </div>
                        <select value={area} onChange={(e) => setArea(e.target.value)}>
                            <option value="north">Norr</option>
                            <option value="east">Östra</option>
                            <option value="west">Västra</option>
                            <option value="south">Söder</option>
                            <option value="center">Centrum</option>
                        </select>
                    </div>

                    <PrimaryBtn disabled={loading} type="submit">
                        BLI MEDLEM
                    </PrimaryBtn>
                </SignupForm>

                <InfoDiv>
                    {error && <div className="error">{error}</div>}
                    <div className="toLoginWrap">
                        <p>Är du redan medlem?</p>
                        <Link to="/login"> Logga in</Link>
                    </div>
                </InfoDiv>

            </FormSection>
        </>
    );
}
