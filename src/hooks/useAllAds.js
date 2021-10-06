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
        /* const unsubscribe =  */db.collection("users")
            .doc(currentUser.uid)
            .collection("userInfo")
            .get()
            .then((snapshot) => {
                setCurrentArea(snapshot.docs[0].data().area)

                // translate area to swedish for rendering
                switch (currentArea) {
                    case 'center':
                        setCurrentAreaInSwedish('Centrum');
                        break;
                    case 'south':
                        setCurrentAreaInSwedish('Söder');
                        break;
                    case 'north':
                        setCurrentAreaInSwedish('Norr');
                        break;
                    case 'west':
                        setCurrentAreaInSwedish('Väster');
                        break;
                    case 'east':
                        setCurrentAreaInSwedish('Öster');
                        break;
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