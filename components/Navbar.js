import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const closeMenuOnOutsideClick = (event) => {
            if (isMenuOpen && !event.target.closest(`.${styles.navbar}`)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', closeMenuOnOutsideClick);

        return () => {
            document.removeEventListener('mousedown', closeMenuOnOutsideClick);
        };
    }, [isMenuOpen]);
    const toggleMenu = () => {
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        setIsMenuOpen(true);
    };

    return (
        <div className = {styles.navigation_bar_container}>
            <div className = {styles.logo}>
                <Image
                    src="/Logo/Logo.png" // Notez que le chemin commence par '/', ce qui indique le dossier 'public'
                    alt="logo"
                    width={75} // Remplacez par la largeur réelle de votre logo
                    height={75} // Remplacez par la hauteur réelle de votre logo
                />
            </div>
            {!isMenuOpen &&  <div className={`${styles.menuBurger}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>}

            <div className={`${styles.navbar} ${isMenuOpen ? styles.navbarActive : ''}`}>
                {isMenuOpen &&  <div className={`${styles.menuBurgerClose}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                </div>}
                <a className = {styles.navLink} href = "/products/products">Nos produits</a>
                <a className = {styles.navLink} href = "/faq">Mes commandes</a>
                <a className = {styles.navLink} href = "/contact">Contact</a>
                {isMenuOpen &&  <a className = {styles.navLink} href = "/auth/login">Login</a>}
            </div>
            <a className = {`${styles.login} ${styles.navLink}`}  href = "/auth/login">Login</a>
        </div>
    );
}

export default Navbar;
