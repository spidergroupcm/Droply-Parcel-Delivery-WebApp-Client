import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider()
    const [user, setUser] = useState(true)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()
    

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateProfileData = (name, photo) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
            .then(() => {
                setUser((previous) => ({ ...previous, displayName: name, photoURL: photo }))
            })
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            // console.log('USER Detected By State: ', currentUser)

            if (currentUser) {
                const userToken = { email: currentUser.email }
                axiosPublic.post('/jwt', userToken)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false)
                        }
                    })

            }
            else {
                localStorage.removeItem('access-token')
                setLoading(false)
            }


        })

        return () => {
            return unsubscribe()
        }
    }, [axiosPublic])


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleLogin,
        updateProfileData,
        logOut,
        setLoading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;