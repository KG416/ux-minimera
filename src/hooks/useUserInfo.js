import { useState, useEffect } from "react";
import { useMainContext } from "../context/MainContext";
import { db } from "../firebase";

const useUserInfo = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [area, setArea] = useState()
    const { currentUser } = useMainContext();

    useEffect(() => {
        db.collection("users")
            .doc(currentUser.uid)
            .collection("userInfo")
            .get()
            .then((snapshot) => {
                setName(snapshot.docs[0].data().name)
                setEmail(snapshot.docs[0].data().email)

                let area = snapshot.docs[0].data().area
                switch (area) {
                    case 'center':
                        setArea('Centrum');
                        break;
                    case 'south':
                        setArea('Söder');
                        break;
                    case 'north':
                        setArea('Norr');
                        break;
                    case 'west':
                        setArea('Väster');
                        break;
                    case 'east':
                        setArea('Öster');
                        break;
                }
            });
    }, [])

    return { name, area, email }
}

export default useUserInfo;