/* NOT IN USE ATM */

import { useState, useEffect } from 'react';
import { useMainContext } from '../context/MainContext';
import { db } from '../firebase';

const useAllAds = () => {
    const [loading, setLoading] = useState(true);
    const [ads, setAds] = useState([]);
    const [currentArea, setCurrentArea] = useState("");
    const [currentAreaInSwedish, setCurrentAreaInSwedish] = useState("");
    const { currentUser } = useMainContext()

    // get area from db. Don't know why I can't make CleanUp func here.
    useEffect(() => {
       /*  const unsubscribe =  */db.collection("users")
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
            });
        /* return () => unsubscribe(); */
    }, [currentUser.uid, currentArea]);

    // get ads from current area
    useEffect(() => {
        setLoading(true)
        const unsubscribe = db.collection("ads")
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
    }, [currentArea])

    return { loading, ads, currentAreaInSwedish }
}

export default useAllAds;