import React from 'react'
import styled from 'styled-components'

const StyledLi = styled.li`
        border: 1px solid purple;
        h3 {
            font-weight: bold;
        }
        p {
            color: grey;
        }
`;

export default function AdItem() {
    return (
        <StyledLi>
            <h3>Titel</h3>
            <p>Detaljer, detaljer, detaljer</p>
        </StyledLi>
    )
}
