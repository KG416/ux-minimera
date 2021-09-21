import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { useMainContext } from '../context/MainContext';
import { AdInput } from './AdInput';

export default function MyAds() {
    const { currentUser } = useMainContext();
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await db.collection("users")
                .doc(currentUser.uid)
                .collection("ads")
                .get()
            setAds(data.docs.map(ad => ({ ...ad.data(), id: ad.id })))
        }
        fetchData()
    }, [currentUser.uid])

    return (
        <>
            <h1>Mina annonser</h1>
            {ads ?
                ads.map(ad => (
                    <div key={ad.adTitle}>
                        <AdInput ad={ad} />
                        <h2>{ad.adTitle}</h2>
                        <p>{ad.adDetails}</p>
                    </div>
                ))
                : "No ads :( After you've created them, you'll see them here..."
            }
        </>
    )
}
