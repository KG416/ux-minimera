import { db } from "../firebase"
import { useState } from 'react'
import { useMainContext } from "../context/MainContext"
import styled from "styled-components"

const StyledInput = styled.input`
    border: 1px red solid;
`;

export const AdInput = ({ ad }) => {
    const [title, setTitle] = useState(ad.adTitle)
    const { currentUser } = useMainContext()

    const onUpdate = () => {
        console.log('onUpdate ran');
        db.collection("users")
            .doc(currentUser.uid)
            .collection("ads")
            .doc(ad.id)
            .set({ ...ad, title })
    }

    return (<>
        <StyledInput value={title}
            onChange={e => {
                setTitle(e.target.value)
            }}
        />
        <button onClick={onUpdate}>Byt titel</button>
    </>)
}