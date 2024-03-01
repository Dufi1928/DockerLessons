import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {signIn, signOut, useSession} from "next-auth/react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const logIn = (jwtToken) => {
        localStorage.setItem('jwt', jwtToken);
        setIsLoggedIn(true);
    };
    const logOut = async () => {
        try {
            const result = await signOut({ redirect: false });
            localStorage.removeItem('jwt');
            setIsLoggedIn(false);
            if (result?.url) {
                router.push(result.url);
            } else {
                router.push('/auth/login');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }

    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
