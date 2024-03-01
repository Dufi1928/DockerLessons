// pages/index.js
import React, { useState} from 'react';
import styles from '@/styles/admin.module.css';
import { AuthProvider } from '../../contexts/AuthProvider';
// import { useRouter } from 'next/router';
import SidebarNavigation from "@/components/SidebarNavigation";
import withAuth from "@/components/withAuth";
import Orders from "./orders";
import Users from "./users";
import Products from "./products";

const Admin = () => {
    // const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('Produits');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const handleSelectMenuItem = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    const renderContent = () => {
        switch (selectedMenuItem) {
            case 'Utilisateurs':
                return <Users />;
            case 'Produits':
                return <Products />;
            case 'Commandes':
                return <Orders />;
            default:
                return <Products />;
        }
    };

    return (
        <>
            <SidebarNavigation onToggle={() => setIsSidebarCollapsed(prev => !prev)} onSelectMenuItem={handleSelectMenuItem} selectedMenuItem={selectedMenuItem} />
            <main className={`${styles.mainContent} ${!isSidebarCollapsed ? styles.expandedMain : ''}`}>
                <div className={styles.content_wrapper}>
                {renderContent()}
                </div>
            </main>
        </>
    );

}
export default withAuth(Admin);
