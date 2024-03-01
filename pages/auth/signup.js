import React, {useState , useEffect} from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import styles from '../../styles/Signup.module.css'
import { useRouter } from 'next/router';
import Image from "next/image";
import {GoogleIcon,
    FacebookIcon,
    UserIcon,
    EmailIcon,
    VisiblePasswordIcon,
    VisibleOffPasswordIcon } from "@/components/icons";
import {signIn} from "next-auth/react";

function SugnUp() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [pseudoError, setPseudoError] = useState("");
    const { logIn } = useAuth();
    const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
    useEffect(() => {
        setFirstNameError("")
    }, [firstName]);
    useEffect(() => {
        setLastNameError("")
    }, [lastName]);
    useEffect(() => {
        setPasswordError("")
    }, [password, confirmPassword]);

    useEffect(() => {
        setEmailError("")
    }, [email ]);


    const validateEmail = (email) => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    };
    const handleSignUpClick = async () => {
        if (!firstName) {
            setFirstNameError("Le nom ne peu pas etre vide");
            return;
        }
        if (!lastName) {
            setLastNameError("Le prénom ne peu pas etre vide");
            return;
        }
        if (confirmPassword !== password) {
            setPasswordError("Les mots de passe ne correspondent pas.");
            return;
        }
        if (password === '') {
            setPasswordError("Les mots de passe dois pas étre vide.");
            return;
        }
        if (!validateEmail(email)) {
            setEmailError("L'Email n'est pas valide");
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, firstName, lastName })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Erreur inconnue');
            }
            if (data.jwtToken) {
                logIn(data.jwtToken);
                router.push('/');
            }
        } catch (error) {
            if (error.message === "User with this email already exists"){
                setEmailError("User with this email already exists")
            }else if (error.message === "User with this pseudo already exists"){
                setPseudoError("User with this email already exists")
            }
            else {
                console.error(error);
            }
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
                            <h2 className={styles.form_title}>Inscris-toi gratuitement 👋</h2>
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
                                <div className={styles.small_inputs_group}>
                                    <div className={styles.input_wraper}>
                                        <div className={`${styles.input_small} ${firstNameError ? styles.input_small_error : ''}`}>
                                            <input className={styles.input} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                                            {firstNameError && <span className={styles.input_label_error}>{firstNameError}</span>}
                                            <label className={`${styles.input_label} ${firstName ? styles.input_label_notEmpty : ''}`}>Nom</label>
                                            <UserIcon/>
                                        </div>
                                    </div>
                                    <div className={styles.input_wraper}>
                                        <div className={`${styles.input_small} ${lastNameError ? styles.input_small_error : ''}`}>
                                            <input className={styles.input} type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                                            {lastNameError && <span className={styles.input_label_error}>{lastNameError}</span>}
                                            <label className={`${styles.input_label} ${lastName ? styles.input_label_notEmpty : ''}`}>Prénom</label>
                                            <UserIcon/>
                                        </div>
                                    </div>
                                </div>
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
                                <div className={styles.input_wraper_large}>
                                    <div className={`${styles.input_large} ${passwordError ? styles.input_small_error : ''}`}>
                                        <input className={styles.input} type={isVisiblePassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                                        {passwordError && <span className={styles.input_label_error}>{passwordError}</span>}
                                        <label className={`${styles.input_label} ${confirmPassword ? styles.input_label_notEmpty : ''}`}>Confirmer le mot de passe</label>
                                    </div>
                                </div>
                                <div className={styles.exist_user}>
                                    <a href="/auth/login">Déjà inscrit·e ? Connexion</a>
                                </div>
                                <button type="button"  onClick={handleSignUpClick} className={styles.submit_button}>S'inscrire</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default SugnUp;
