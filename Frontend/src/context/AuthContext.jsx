import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';

const AuthContext = createContext();
export const useAuth = () =>{
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

// authProvider

const AuthProvide = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // register a user
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    // login a user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    // sign up with google
    const googleSignIn = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    // logout a user
    const logoutUser = async () => {
        return await signOut(auth)
    }

    // manage user 
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)

            if (user) {
                console.log(user)
                const {email, displayName, photoURL} = user
                const userData = {
                    email,
                    username: displayName,
                    photo: photoURL
                }      
            }
        })
        return () => unsubcribe()
    }, [])

    const value = {
        currentUser,
        registerUser,
        loginUser,
        googleSignIn,
        logoutUser
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvide;