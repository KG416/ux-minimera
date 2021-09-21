import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDevrknuquauekeuei0a5HCwEQ82ixQCZw",
    authDomain: "uxux-ccf02.firebaseapp.com",
    projectId: "uxux-ccf02",
    storageBucket: "uxux-ccf02.appspot.com",
    messagingSenderId: "262058341482",
    appId: "1:262058341482:web:a452b3acd30af99fd24613"
    /* apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID, */
});

export const auth = app.auth();
export const db = firebase.firestore();
export default app;