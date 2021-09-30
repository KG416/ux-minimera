import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const MainContext = React.createContext();

export function useMainContext() {
    return useContext(MainContext);
}

export function MainContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout,
    };

    return (
        <MainContext.Provider value={value}>
            {!loading && children}
        </MainContext.Provider>
    );
}
