import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider'; // Import useAuth for accessing AuthContext
import axios from 'axios';
import { signIn, signOut, useSession } from "next-auth/react";
import Loading from "@/components/Loading";

const withAuth = (WrappedComponent) => {

    return (props) => {
        const [isLoading, setIsLoading] = useState(false);
        const [token, setToken] = useState("");
        const [redirectToLogin, setRedirectToLogin] = useState(false);
        const { isLoggedIn, logIn } = useAuth();
        const { data, status } = useSession();
        const router = useRouter();
        const { data: session } = useSession();


        useEffect(() => {
            if (status === 'authenticated' && token === "") {
                if (data){
                    setToken(data.user.jwt);
                    logIn(data.user.jwt);
                    setIsLoading(false);
                    console.log(data)
                    console.log(status);
                }
            }else if(status !== 'loading' && status !== 'authenticated'){
                if (localStorage.getItem('jwt')){
                    setToken(localStorage.getItem('jwt'));
                }else{
                    setRedirectToLogin(true);
                }
            }
            else{
                setIsLoading(false);
                console.log(isLoading)
            }
        }, [status]);

        useEffect(() => {
            if (redirectToLogin) {
                router.push('/auth/login');
            }
        }, [redirectToLogin]);

        if (isLoading) return <Loading />;
        if (!isLoggedIn) {

            if (token !== "") {
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://revisionzen.com:8000/api/auth/checkjwt',
                    headers: {
                        'Content-Type': 'text/plain',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                };
                axios.request(config)
                    .then((response) => {
                        if (response.data.id) {
                            logIn(token);
                        } else {
                            setRedirectToLogin(true);
                        }
                    })
                    .catch((error) => {
                        setRedirectToLogin(true);
                        return null;
                    });
            }
        }
        else{
            return isLoggedIn ? <WrappedComponent {...props} /> : null;
        }
    }
};

export default withAuth;