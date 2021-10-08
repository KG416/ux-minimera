import { Link } from 'react-router-dom';
import useAllAds from '../hooks/useAllAds';
import { AdsSection } from '../style/mainStyles';

export default function Dashboard() {
    const { loading, ads, currentAreaInSwedish } = useAllAds();

    return (
        <AdsSection>
            <h1>Annonser</h1>
            <p className="area">Vald stadsdel: <span>{currentAreaInSwedish}</span> </p>
            {loading && <p>Loading...</p>}

            <div className="adsContainer">
                {!loading && !ads.length > 0 &&
                    <p> Inga annonser att visa för denna stadsdel. Efter annonser skapats visas de här.</p>}

                {ads.length > 0 &&
                    ads.map(ad => (
                        <Link to={`/addetails/${ad.id}`} key={ad.id} className="adCard">
                            <h2>{ad.adTitle}</h2>
                            <p className="details">{ad.adDetails}</p>
                            <p className="author">Annonsör: {ad.authorName}</p>
                        </Link>
                    ))
                }
            </div>
        </AdsSection>
    )
}
