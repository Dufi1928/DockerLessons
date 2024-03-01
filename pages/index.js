// pages/index.js
import React, { useState} from 'react';
import styles from '../styles/Home.module.css';
// import { useRouter } from 'next/router';
import SidebarNavigation from "@/components/SidebarNavigation";
import withAuth from "../components/withAuth";
import Navbar from "../components/Navbar";

const Home = () => {
    // const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    return (
        <>
            <SidebarNavigation onToggle={() => setIsSidebarCollapsed(prev => !prev)} />
            <main className={`${styles.mainContent} ${!isSidebarCollapsed ? styles.expandedMain : ''}`}>
            </main>
        </>
    );
}
export default withAuth(Home);
