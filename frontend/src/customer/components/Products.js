import React, { useState } from 'react';
import styles from './product.module.css';
import sampleProduct from '../assets/sample.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const products = [
    { id: 1, name: 'Product 1', category: 'Categ 1', price: 149, image: sampleProduct },
    { id: 2, name: 'Product 2', category: 'Categ 2', price: 299, image: sampleProduct },
    { id: 3, name: 'Product 3', category: 'Categ 3', price: 349, image: sampleProduct },
    { id: 4, name: 'Product 4', category: 'Categ 4', price: 499, image: sampleProduct },
    { id: 5, name: 'Product 5', category: 'Categ 5', price: 549, image: sampleProduct },
    { id: 6, name: 'Product 6', category: 'Categ 6', price: 699, image: sampleProduct },
    { id: 7, name: 'Product 7', category: 'Categ 7', price: 749, image: sampleProduct },
    { id: 8, name: 'Product 8', category: 'Categ 8', price: 899, image: sampleProduct },
];

const Products = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleProductClick = (productId) => {
        const product = products.find(p => p.id === productId);
        setSelectedProduct(product);
        setQuantity(1);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.productList}>
                {products.map((product) => (
                    <div key={product.id} className={styles.productContainer} onClick={() => handleProductClick(product.id)}>
                        <img src={product.image} alt={product.name} className={styles.productImage} />
                        <div className={styles.productName}>{product.name}</div>
                        <div className={styles.productDetails}>
                            <div className={styles.productCategory}>{product.category}</div>
                            <div className={styles.productPrice}>₱ {product.price}</div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProduct && (
                <div className={styles.productModal}>
                    <div className={styles.productModalContent}>
                        <button className={styles.closeButton} onClick={handleCloseModal}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                        <img src={selectedProduct.image} alt={selectedProduct.name} className={styles.productModalImage} />
                        <div className={styles.productModalDetails}>
                            <h2>{selectedProduct.name}</h2>
                            <div className={styles.productPrice}>₱ {selectedProduct.price}</div>
                        </div>

                        <div className={styles.quantityOrder}>
                            <div className={styles.quantityInput}>
                                <div className={styles.quantityControl}>
                                    <button onClick={decrementQuantity}>-</button>
                                    <input
                                        id="quantity"
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min="1"
                                    />
                                    <button onClick={incrementQuantity}>+</button>
                                </div>
                            </div>
                            <button className={styles.addToOrderButton}>
                                Add to Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
