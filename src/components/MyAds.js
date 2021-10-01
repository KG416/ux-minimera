import styled from 'styled-components';
import useUserAds from './hooks/useUserAds';

// temp styling
const StyledDiv = styled.div`
    .adCard {
        border: 2px solid red;
        margin: 5px;
        padding: 5px;
    }
    button {
        cursor: pointer;
        padding: 3px;
        margin: 3px;
        width: 80px;
        &:hover {
        border: 1px solid black;
    }
    }
`;

export default function MyAds() {
    const { loading, ads, deleteAd } = useUserAds();

    return (
        <StyledDiv>
            <h1>Mina annonser</h1>

            {loading && <p>Loading...</p>}

            {!loading && !ads.length > 0 &&
                <p> Inga annonser att visa :( Efter du gjort en annons visas den här.</p>}

            {ads.length > 0 &&
                ads.map(ad => (
                    <div key={ad.id} className="adCard">
                        <h2>{ad.adTitle}</h2>
                        <p>{ad.adDetails}</p>
                        <button onClick={() => deleteAd(ad)}>Ta bort</button>
                    </div>
                ))
            }
        </StyledDiv>
    )
}
