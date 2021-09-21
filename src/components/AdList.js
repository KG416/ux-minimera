import React from 'react'
import styled from 'styled-components'

const StyledUl = styled.ul`
        border: 1px solid orange;
        display: flex;
        flex-direction: column;
`;

export default function AdList() {
    return (
        <StyledUl>
            <h1>AdList</h1>

        </StyledUl>
    )
}
