// components/Navigation.js
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/SidebarNavigation.module.css';
import { useAuth } from '@/contexts/AuthProvider';

const SidebarNavigation = ({ onToggle, onSelectMenuItem, selectedMenuItem }) => {

    const {isLoggedIn, logIn, logOut} = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showTitles, setShowTitles] = useState(true);
    const colors = ['#FAB45C', '#FC8793', '#316DF3', '#8E59D2', '#8044CD'];
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };
    const circleColors = Array.from({length: 20}, () => getRandomColor());

    const menuItems = [
        {icon: 'inventory_2', title: 'Produits', link: '/home', class: 'material-symbols-outlined'},
        {icon: 'person_4', title: 'Utilisateurs', link: 'admin//users', class: 'material-symbols-outlined'},
        {icon: 'orders', title: 'Commandes', link: '/home', class: 'material-symbols-outlined'},
    ];

    const logoutMenuItem = {
        icon: 'logout',
        title: 'Déconnexion',
        onClick: logOut, // Utilisation de la fonction logOut
        class: 'material-symbols-outlined'
    };

    if (isLoggedIn) {
        menuItems.push(logoutMenuItem);
    } else {
        menuItems.push({icon: 'login', title: 'Connexion', link: '/auth/signin', class: 'material-symbols-outlined'});
    }


    useEffect(() => {
        if (isCollapsed) {
            setShowTitles(false)
        } else {
            const timer = setTimeout(() => setShowTitles(true), 100); // Affiche les titres après que la barre latérale est complètement ouverte
            return () => clearTimeout(timer);
        }
    }, [isCollapsed]);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
        onToggle();
    };

    return (
        <div className={`${styles.nav} ${isCollapsed ? styles.collapsed : ''}`}>
            <div className={`${styles.logo_container} ${isCollapsed ? styles.collapsedLogo : ''}`}>
                <Image
                    src="/Logo/Logo.png"
                    alt="Logo de Revision Zen"
                    fill
                    style={{objectFit: 'contain'}}
                />

            </div>
            <ul className={styles.circles}>
                {circleColors.map((color, index) => (
                    <li key={index} style={{backgroundColor: color}}></li>
                ))}
            </ul>
            <div className={styles.menuItems}>
                {menuItems.map((item, index) => {
                    const isSelected = item.title === selectedMenuItem;
                    const menuItemClass = isSelected ? `${styles.menuItem} ${styles.selected}` : styles.menuItem;
                    return (
                        <a key={index} onClick={() => onSelectMenuItem(item.title)} className={menuItemClass}>
                            <span className={`${styles.icon} ${item.class}`}>{item.icon}</span>
                            <span
                                className={`${styles.title} ${showTitles ? styles.showTitle : ''}`}>{item.title}</span>
                        </a>
                    );
                })}
            </div>
            <span onClick={toggleCollapse}
                  className={`${styles.toggleIcon} material-symbols-outlined ${isCollapsed ? styles.rotated : ''}`}>
                keyboard_arrow_left
            </span>
        </div>
    );
};

export default SidebarNavigation;
