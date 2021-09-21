import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const MainContext = React.createContext();

export function useMainContext() {
    return useContext(MainContext);
}

export function MainContextProvider({ children }) {
    // Auth
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
            //as soon as we have a user, setLoading changes to false
        });
        return unsubscribe;
        //unsubscribe will unsubscribe us from the onAuthState-listener when it's unmounted
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
            {/* if we're not loading, we'll render out the children */}
        </MainContext.Provider>
    );
}
