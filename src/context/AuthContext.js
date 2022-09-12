import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const UserContext = createContext();

const AuthContext = ({ children }) => {

    const [user, setUser] = useState({});

    const signup = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password);
        return setDoc(doc(db, 'users', email), {
            watchList: []
        });
    }

    const signin = (email, passsword) => {
        return signInWithEmailAndPassword(auth, email, passsword);
    }

    const logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser);
        })
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, signin, signup, logout }}>{children}</UserContext.Provider>
    )
}

export default AuthContext

export const UserAuthStates = () => {
    return useContext(UserContext);
}