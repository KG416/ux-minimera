import useUserAds from '../hooks/useUserAds';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import { AdsSection } from '../style/mainStyles';

export default function MyAds() {
    const { loading, ads, deleteAd } = useUserAds();

    return (
        <AdsSection>
            <h1>Mina annonser</h1>

            {loading && <p>Loading...</p>}

            <div className="adsContainer">
                {!loading && !ads.length > 0 &&
                    <p> Inga annonser att visa :( Efter du gjort en annons visas den här.</p>}

                {ads.length > 0 &&
                    ads.map(ad => (
                        <div key={ad.id} className="adCard">
                            <div className="top-row">
                                <h2>{ad.adTitle}</h2>
                                <button className="deleteBtn">
                                    <FontAwesomeIcon icon={faTrash}
                                        onClick={() => deleteAd(ad)}
                                    />
                                </button>
                            </div>
                            <p className="details">{ad.adDetails}</p>
                        </div>
                    ))
                }
            </div>
        </AdsSection>
    )
}
