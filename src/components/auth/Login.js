import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useMainContext } from "../../context/MainContext";
import { FormSection, PrimaryBtn } from "../../style/mainStyles";

const InfoDiv = styled.div`
    font-family: Roboto;

    .toSignupWrap {
        /* outline: 1px solid red; */

        display: flex;
        flex-direction: row;
        justify-self: center;
        align-items: center;
    }

    p {
        font-size: 16px;
    }

    a {
        text-decoration: underline;
        font-weight: bold;
        cursor: pointer;
        margin: 5px;
    }

    .error {
        color: red;
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
            setLoading(false);
            history.push("/");
        } catch {
            setError("Failed to log in");
            setLoading(false);
        }
    }

    return (
        <>
            <FormSection>
                <h1>Logga in</h1>
                {error && <div>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="label-wrap">
                            <label>Mail</label>
                        </div>
                        <input
                            type="email"
                            placeholder="Ange mailadress"
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
                            placeholder="Ange lösenord"
                            ref={passwordRef}
                            required
                        />
                    </div>

                    <InfoDiv>
                        <Link to="/forgot-password">Glömt lösenord?</Link>
                    </InfoDiv>

                    <PrimaryBtn disabled={loading} type="submit">
                        LOGGA IN
                    </PrimaryBtn>

                    <InfoDiv>
                        <div className="toSignupWrap">
                            <p>Ej medlem?{" "}</p>
                            <Link to="/signup">Bli medlem</Link>
                        </div>
                    </InfoDiv>
                </form>
            </FormSection>
        </>
    );
}
