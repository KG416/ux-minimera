import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMainContext } from "../../context/MainContext";
import styled from 'styled-components';

const TempSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & input {
        padding: 10px;
        border: 1px solid black;
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
`;

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useMainContext();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError("Failed to log in");
        }
        setLoading(false);
    }

    return (
        <>
            <TempSection>
                <h1>Logga in</h1>
                {error && <div>{error}</div>}
                <form onSubmit={handleSubmit}>
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
                    <span>
                        <Link to="/forgot-password">Glömt lösenord?</Link>
                    </span>
                    <button disabled={loading} type="submit">
                        Logga in
                    </button>

                    <div>
                        Ej medlem?{" "}
                        <Link to="/signup"><span>Bli medlem</span></Link>
                    </div>
                </form>
            </TempSection>
        </>
    );
}
