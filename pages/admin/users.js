// pages/index.js
import React, { useState, useEffect} from 'react';
// import styles from '@/styles/admin/users.module.css';
// import { useRouter } from 'next/router';
import withAuth from "@/components/withAuth";
import styles from '@/styles/admin/products.module.css';
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://13.38.93.57/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };
    const openNewProductPopup = () => {
        setCurrentUser({ name: '', description: '', price: '', discount: '', stock: '', image: '' });
        setShowEditPopup(true);
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setCurrentUser(user);
        setShowEditPopup(true);
    };
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const url = currentUser.id ?
            `https://13.38.93.57/users/${currentUser.id}` :
            'https://13.38.93.57/users';
        try {
            const method = currentUser.id ? axios.put : axios.post;
            const response = await method(url, currentUser);
            console.log('Réponse de l\'API :', response.data);
        } catch (error) {
            console.error("Erreur lors de la requête : ", error);
        }

        setShowEditPopup(false);
        fetchUsers();
    };

    const handleDelete = async (userId) => {
        try {
            const response = await axios.delete(`https://13.38.93.57/users/${userId}`);
            console.log('Utilisateur supprimé :', response.data);
        } catch (error) {
            console.error("Erreur lors de la suppression du utilisateur: ", error);
        }
        fetchUsers();
    };

    const handleClosePopup = () => {
        setShowEditPopup(false);
    };


    return (
        <>
            <div className={styles.headContainer}>
                <h1 className={styles.title}>Gestion des utilisateurs</h1>
                <button className={styles.createNewProductButton} onClick={openNewProductPopup}>Créer un nouveau
                    utilisateur
                </button>
            </div>
            <div className={styles.scrollableTableContainer}>
                <table className={styles.productsTable}>
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Adress</th>
                        <th>Telephone</th>
                        <th>Action</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.address}</td>
                            <td>{user.mail}</td>
                            <td>{user.phone}</td>
                            <td className={styles.action}>
                                <button className={styles.productsButton} onClick={() => handleEdit(user)}>
                                    <span className="material-symbols-outlined">edit</span>
                                </button>
                                <button className={styles.productsButton} onClick={() => handleDelete(user.id)}>
                                    <span className={styles.remove} class="material-symbols-outlined">delete</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {showEditPopup && (
                <div className={styles.popup}>
                    <div className={styles.popupInner}>
                        <h2>{currentUser.id ? 'Modifier le utilisateur' : 'Créer le utilisateur'}</h2>
                        <form onSubmit={handleUpdateUser}>
                            <div className={styles.formGroup}>
                                <label>Nom</label>
                                <input
                                    type="text"
                                    value={currentUser.first_name}
                                    onChange={(e) => setCurrentUser({...currentUser, first_name: e.target.value})}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Prenom</label>
                                <input
                                    type="text"
                                    value={currentUser.last_name}
                                    onChange={(e) => setCurrentUser({...currentUser, last_name: e.target.value})}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Adresse</label>
                                <input
                                    type="text"
                                    value={currentUser.address}
                                    onChange={(e) => setCurrentUser({...currentUser, address: e.target.value})}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input
                                    type="text"
                                    value={currentUser.mail}
                                    onChange={(e) => setCurrentUser({...currentUser, mail: e.target.value})}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>N Phone</label>
                                <input
                                    type="text"
                                    value={currentUser.phone}
                                    onChange={(e) => setCurrentUser({...currentUser, phone: e.target.value})}
                                />
                            </div>
                            {currentUser.id ? <div></div>  : <div className={styles.formGroup}>
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={currentUser.password}
                                    onChange={(e) => setCurrentUser({...currentUser, password: e.target.value})}
                                />
                            </div>}


                            {/* Répétez pour chaque champ, ex: prix, description, etc. */}
                            <div className={styles.formActions}>
                                <button type="submit" className={styles.saveButton}>
                                    {currentUser.id ? 'Enregistrer les modifications' : 'Créer le utilisateur'}
                                </button>
                                <button onClick={handleClosePopup} className={styles.cancelButton}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
export default withAuth(Users);
