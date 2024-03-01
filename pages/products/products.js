import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/router';
import Loading from '../../components/Loading'
import styles from '../../styles/Products.module.css';
import withAuth from "../../components/withAuth";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(' https://15.188.52.177/products');
                setProducts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (productId) => {
        router.push(`/product/${productId}`); // Modifiez ceci selon votre schéma d'URL
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <>
            <Navbar></Navbar>
        <div className={styles.productsContainer}>
            <h1 className={styles.title}>Nos produits</h1>
            <div className={styles.productList}>
                {products.map(product => (
                    <div key={product.id} className={styles.productCard} onClick={() => handleProductClick(product.id)}>
                        <h2 className={styles.productName}>{product.name}</h2>
                        <img src={product.image} alt={product.name} className={styles.productImage}/>
                        <p className={styles.productDescription}>
                            {product.description.length > 100
                                ? product.description.slice(0, 100) + "..."
                                : product.description}
                        </p>
                        <p className={styles.productPrice}>{product.price.toFixed(2)} €</p>
                        {product.discount > 0 && (
                            <p className={styles.productDiscount}>Remise: {product.discount.toFixed(2)} €</p>
                        )}
                        <p className={styles.productStock}>Stock: {product.stock}</p>
                        <button className={styles.viewProductButton}>Acheter</button>
                    </div>
                ))}
            </div>
        </div>
        </>

    );
}

export default withAuth(Products);
