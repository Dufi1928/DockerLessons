import '../styles/global.css'
import { useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthProvider';
import {SessionProvider} from "next-auth/react";

export default function App({ Component, pageProps }) {

    useEffect(() => {
        sessionStorage.setItem('originUrl', window.location.href);
    }, []);
    return (
        <SessionProvider session={pageProps.session}>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </SessionProvider>
    )
}
