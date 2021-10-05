import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useAllAds from '../hooks/useAllAds';

// temp styling
const StyledDiv = styled.div`
    h1 {
        margin: 10px 0 0;
    }
    .area {
        font-size: 16px;
        text-align: center;

        span {
            font-weight: bold;
        }
    }
    .adsContainer {
        border: 2px green solid;
        display: grid;
        grid-template-columns: 50% 50%;
        margin: 30px 0 30px;

    }
    .adCard {
        font-family: 'Roboto', sans-serif;
        min-height: 150px;
        cursor: pointer;
        border: 2px solid red;
        margin: 5px;
        padding: 1px;
        
        &:hover {
        background: lightgray;
        }

        & h2 {
            text-align: left;
            color: darkgreen;
            margin: 0 0 10px;
            width: 100%;
        }

        & p {
          
        }

        a {
            height: 100%;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .author {
            color: darkred;
            font-style: italic;
        }
    }
`;

export default function Dashboard() {
    /* const [currentArea, setCurrentArea] = useState("");
    const [currentAreaInSwedish, setCurrentAreaInSwedish] = useState("");
    const { currentUser } = useMainContext();
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(false);

    const adsInFb = db.collection("ads");

    // get area from firestore
    useEffect(() => {
        const unsubscribe = db.collection("users")
            .doc(currentUser.uid)
            .collection("userInfo")
            .get()
            // This is async, so it returns a promise
            .then((snapshot) => {
                let documents = [];
                snapshot.docs.forEach((doc) => {
                    documents.push(doc.data());
                });
                setCurrentArea(documents[0].area)

                // translate area to swedish for rendering
                if (currentArea === 'south') {
                    setCurrentAreaInSwedish('Söder');
                } else if (currentArea === 'center') {
                    setCurrentAreaInSwedish('Centrum');
                } else if (currentArea === 'north') {
                    setCurrentAreaInSwedish('Norr');
                } else if (currentArea === 'west') {
                    setCurrentAreaInSwedish('Väster');
                } else if (currentArea === 'east') {
                    setCurrentAreaInSwedish('Öster');
                }

                return () => unsubscribe();
            });
    }, [currentUser.uid, currentArea]);

    // get ads
    useEffect(() => {
        setLoading(true)
        const unsubscribe = adsInFb
            // only ads from current area
            .where("area", "==", currentArea)
            .onSnapshot(querySnapshot => {
                const items = []
                querySnapshot.forEach(doc => {
                    items.push(doc.data())
                })
                setAds(items)
                setLoading(false)
            })
        return () => unsubscribe();
    }, [currentArea]) */

    const { loading, ads, currentAreaInSwedish } = useAllAds();

    return (
        <StyledDiv>
            <h1>Annonser</h1>
            <p className="area">Vald stadsdel: <span>{currentAreaInSwedish}</span> </p>
            {loading && <p>Loading...</p>}

            <div className="adsContainer">
                {!loading && !ads.length > 0 &&
                    <p> Inga annonser att visa för denna stadsdel. Efter annonser skapats visas de här.</p>}

                {ads.length > 0 &&
                    ads.map(ad => (
                        <div key={ad.id} className="adCard">
                            <Link to={`/addetails/${ad.id}`}>
                                <h2>{ad.adTitle}</h2>
                                <p>{ad.adDetails}</p>
                                <p className="author">Annonsör: {ad.authorName}</p>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </StyledDiv>
    )
}
