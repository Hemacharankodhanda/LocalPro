import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAoq7TIkCeurINc91Dd0Zec89jqm1viBmk",
    authDomain: "careerplus-3963c.firebaseapp.com",
    projectId: "careerplus-3963c",
    storageBucket: "careerplus-3963c.firebasestorage.app",
    messagingSenderId: "562277722063",
    appId: "1:562277722063:web:420b2cb44deb65f8d294ba",
    measurementId: "G-VLNEJJKECV"
};

const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);

export {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
};
