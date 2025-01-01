import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';
import getBaseUrl from '../utils/baseURL';
import {jwtDecode} from "jwt-decode"; // Correct default import

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

// authProvider

const AuthProvide = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    // register a user
    const registerUser = async (email, password, username) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // Send user data to backend
        await axios.post(`${getBaseUrl()}/api/auth/register`, {
            uid: userCredential.user.uid,
            email,
            username,
            role: 'user'
        })
        return userCredential
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
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            setCurrentUser(null);
            setUserRole(null);
            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    // manage user 
    useEffect(() => {
        const checkAuthState = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                // Decode the token to get user info
                const decodedToken = jwtDecode(token); // Use jwtDecode as default
                setCurrentUser({ uid: decodedToken.uid, email: decodedToken.email });
                setUserRole(decodedToken.role);
                setLoading(false);
            } else {
                // ...existing Firebase auth state change logic...
                const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    setCurrentUser(user);
                    setLoading(false);

                    if (user) {
                        try {
                            // Fetch user role from backend
                            const response = await axios.get(`${getBaseUrl()}/api/auth/${user.uid}`);
                            const role = response.data.role;
                            setUserRole(role);
                        } catch (error) {
                            console.error("Failed to fetch user role", error);
                        }
                    } else {
                        setUserRole(null);
                    }
                });
                return () => unsubscribe();
            }
        };
        checkAuthState();
    }, []);

    const value = {
        currentUser,
        userRole,
        loading,
        registerUser,
        loginUser,
        googleSignIn,
        logoutUser,
        setCurrentUser,    
        setUserRole        
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvide;