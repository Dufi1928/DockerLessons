// pages/product/[productId].js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../styles/ProductDetail.module.css';
import Navbar from "@/components/Navbar";
import Loading from '../../components/Loading'

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();
    const {productId} = router.query;

    useEffect(() => {
        if (!router.isReady) return;

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`process.env.PRODUCT_ENDPOINT/product/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product: ", error);
            }
        };

        fetchProduct();
    }, [router.isReady, productId]);


    const handlePurchase = () => {
        console.log(`Purchased ${quantity} of product ID: ${productId}`);
    };

    if (!product) {
        return <Loading></Loading>
    }

    return (
        <>
            <Navbar></Navbar>

            <div className={styles.productDetailContainer}>
                <div className={styles.productImageContainer}>
                    <Image src={product.image} alt={product.name} width={500} height={500}/>
                </div>
                <div className={styles.productDetails}>
                    <h1 className={styles.productTitle}>{product.name}</h1>
                    <p className={styles.productDescription}>{product.description}</p>
                    <p className={styles.productPrice}>{product.price.toFixed(2)} €</p>
                    {product.discount > 0 && (
                            <p className={styles.productDiscount}>Remise: {product.discount.toFixed(2)} €</p>
                        )}
                    <div className={styles.quantitySelector}>
                        <button onClick={() => setQuantity(qty => Math.max(1, qty - 1))}>-</button>
                        <input type="number" value={quantity}
                               onChange={e => setQuantity(Math.max(1, parseInt(e.target.value)))}/>
                        <button onClick={() => setQuantity(qty => qty + 1)}>+</button>
                    </div>
                    <button className={styles.purchaseButton} onClick={handlePurchase}>
                        Acheter maintenant
                    </button>
                </div>
            </div>
        </>

    )
        ;
};

export default ProductDetail;

