import { useState, useEffect } from 'react';
import { useMainContext } from '../context/MainContext';
import { db } from '../firebase';

const useUserAds = () => {
    const [loading, setLoading] = useState(true);
    const [ads, setAds] = useState([]);
    const { currentUser } = useMainContext();

    // get users ads from db
    useEffect(() => {
        const unsubscribe = db.collection("ads")
            // only add ads from current user
            .where("authorId", "==", currentUser.uid)
            .onSnapshot(querySnapshot => {
                const items = []
                querySnapshot.forEach(doc => {
                    items.push(doc.data())
                })
                setAds(items)
                setLoading(false)
            })
        return () => unsubscribe()
    }, [])

    const deleteAd = ad => {
        db.collection("ads")
            .doc(ad.id)
            .delete()
            .catch((err) => {
                console.error(err);
            });
    }

    return { loading, ads, deleteAd }
}

export default useUserAds;