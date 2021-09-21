import styled from 'styled-components/macro';

const StyledContainer = styled.div`
    border: 2px solid blue;
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding-right: 3.5%;
    padding-left: 3.5%;

    /* Hard coded quick fix */
    @media (min-width: 700px) {
    margin-top: 97px;
}

`;

export default function Container({ children }) {
    return (
        <StyledContainer>
            {children}
        </StyledContainer>
    )
}
