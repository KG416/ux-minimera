import styled from 'styled-components/macro';

const StyledContainer = styled.div`
    outline: 2px solid blue;

    @media (min-width: 700px) {
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding-right: 1.5%;
    padding-left: 1.5%;

    /* Hard coded quick fix */
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
