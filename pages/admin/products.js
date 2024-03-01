import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/admin/products.module.css';
import withAuth from "@/components/withAuth";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const fetchProducts = async () => {
        console.log(process.env.PRODUCT_ENDPOINT+'/products')
        try {
            const response = await axios.get(' https://15.188.52.177/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };
    const openNewProductPopup = () => {
        setCurrentProduct({ name: '', description: '', price: '', discount: '', stock: '', image: '' });
        setShowEditPopup(true);
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setShowEditPopup(true);
    };
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const url = currentProduct.id ?
            `http://localhost:3001/product/modify/${currentProduct.id}` :
            'http://localhost:3001/product/add';
        try {
            const method = currentProduct.id ? axios.patch : axios.post;
            const response = await method(url, currentProduct);
            console.log('Réponse de l\'API :', response.data);
        } catch (error) {
            console.error("Erreur lors de la requête : ", error);
        }

        setShowEditPopup(false);
        fetchProducts();
    };

    const handleDelete = async (productId) => {
        try {
            const response = await axios.delete(` https://15.188.52.177/product/delete/${productId}`);
            console.log('Produit supprimé :', response.data);
        } catch (error) {
            console.error("Erreur lors de la suppression du produit: ", error);
        }
        fetchProducts();
    };

    const handleClosePopup = () => {
        setShowEditPopup(false);
    };

    return (
        <>
            <div className={styles.headContainer}>
                <h1 className={styles.title}>Gestion des produits</h1>
                <button className={styles.createNewProductButton} onClick={openNewProductPopup}>Créer un nouveau
                    produit
                </button>
            </div>
            <div className={styles.scrollableTableContainer}>
                <table className={styles.productsTable}>
                    <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Réduction</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td><img src={product.image} alt={product.name} className={styles.productImage}/></td>
                            <td>{product.name}</td>
                            <td>{product.price.toFixed(2)} €</td>
                            <td>{product.discount.toFixed(2)} €</td>
                            <td>{product.stock}</td>
                            <td className={styles.action}>
                                <button className={styles.productsButton} onClick={() => handleEdit(product)}>
                                    <span className="material-symbols-outlined">edit</span>
                                </button>
                                <button className={styles.productsButton} onClick={() => handleDelete(product.id)}>
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
                        <h2>{currentProduct.id ? 'Modifier le produit' : 'Créer le produit'}</h2>
                        <form onSubmit={handleUpdateProduct}>
                            <div className={styles.formGroup}>
                                <label>Nom du produit</label>
                                <input
                                    type="text"
                                    value={currentProduct.name}
                                    onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description</label>
                                <textarea
                                    value={currentProduct.description}
                                    onChange={(e) => setCurrentProduct({
                                        ...currentProduct,
                                        description: e.target.value
                                    })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Prix</label>
                                <input
                                    type="text"
                                    value={currentProduct.price}
                                    onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Reduction</label>
                                <input
                                    type="text"
                                    value={currentProduct.discount}
                                    onChange={(e) => setCurrentProduct({...currentProduct, discount: e.target.value})}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Stock</label>
                                <input
                                    type="text"
                                    value={currentProduct.stock}
                                    onChange={(e) => setCurrentProduct({...currentProduct, stock: e.target.value})}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Image</label>
                                <input
                                    type="text"
                                    value={currentProduct.image}
                                    onChange={(e) => setCurrentProduct({...currentProduct, image: e.target.value})}
                                />
                            </div>

                            {/* Répétez pour chaque champ, ex: prix, description, etc. */}
                            <div className={styles.formActions}>
                                <button type="submit" className={styles.saveButton}>
                                    {currentProduct.id ? 'Enregistrer les modifications' : 'Créer le produit'}
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

export default withAuth(Products);
