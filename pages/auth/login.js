import React, {useState , useEffect} from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import styles from '../../styles/Signup.module.css'
import { useRouter } from 'next/router';
import Image from "next/image";
import {GoogleIcon,
    FacebookIcon,
    EmailIcon,
    VisiblePasswordIcon,
    VisibleOffPasswordIcon } from "@/components/icons";
import {signIn} from "next-auth/react";

function LogIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const { logIn } = useAuth();
    const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
    useEffect(() => {
        setPasswordError("")
    }, [password]);

    useEffect(() => {
        setEmailError("")
    }, [email ]);


    const validateEmail = (email) => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    };
    const handleSignUpClick = async () => {
        if (!validateEmail(email)) {
            setEmailError("L'Email n'est pas valide");
            return;
        }
        if (password === '') {
            setPasswordError("Les mots de passe dois pas étre vide.");
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 401) {
                    setPasswordError("L'Email ou le mot de passe est incorrect");
                    setEmailError("L'Email ou le mot de passe est incorrect");
                }
                throw new Error(data.message || 'Erreur inconnue');
            }
            if (data.jwtToken) {
                logIn(data.jwtToken);
                router.push('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    function changeVisibility() {
        setIsVisiblePassword(!isVisiblePassword)
    }

    return (
        <>
            <main className={styles.mainContent}>
                <div className={styles.left_side}>
                    <div className={styles.pc_container}>
                        <div className={styles.pc_image_wrapper}>
                            <Image
                                src="/Auth/3dObject2.png"
                                alt="pcImage"
                                fill
                                className={ styles.pc_image}
                            />
                        </div>
                    </div>
                    <div className={styles.form_wrapper}>
                        <form className={styles.form}>
                            <h2 className={styles.form_title}>Connecte-toi </h2>
                            <div className={styles.socials_buttons}>
                                <button className={styles.google_button} onClick={() => signIn('google', { callbackUrl: `${currentUrl}/` })}> <GoogleIcon/><span className={styles.inner_button}>Google</span></button>
                                <button className={styles.facebook_button}><FacebookIcon/><span className={styles.inner_button}>Facebook</span></button>
                            </div>
                            <div className={styles.separate}>
                                <div className={styles.separate_content_wrapper}>
                                    <h2 >Or</h2>
                                </div>
                            </div>
                            <div className={styles.form_content}>
                                <div className={styles.input_wraper_large}>
                                    <div className={`${styles.input_large} ${emailError ? styles.input_small_error : ''}`}>
                                        <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                        {emailError && <span className={styles.input_label_error}>{emailError}</span>}
                                        <label className={`${styles.input_label} ${email ? styles.input_label_notEmpty : ''}`}>Email</label>
                                        <EmailIcon/>
                                    </div>
                                </div>
                                <div className={styles.input_wraper_large}>
                                    <div className={`${styles.input_large} ${passwordError ? styles.input_small_error : ''}`}>
                                        <input className={styles.input} type={isVisiblePassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                        {passwordError && <span className={styles.input_label_error}>{passwordError}</span>}
                                        <label className={`${styles.input_label} ${password ? styles.input_label_notEmpty : ''}`}>Mot de passe</label>
                                        <div  className={styles.eye_cursor} onClick={changeVisibility}>
                                            {isVisiblePassword ? <VisibleOffPasswordIcon/> : <VisiblePasswordIcon/>}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.exist_user}>
                                    <a href="/auth/signup">Tu n'as pas encore de compte ? Inscription</a>
                                </div>
                                <button type="button"  onClick={handleSignUpClick} className={styles.submit_button}>Connection</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default LogIn;
