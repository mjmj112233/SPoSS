import React, { useState, useEffect } from 'react';
import styles from './product.module.css';
import sampleProduct from '../assets/sample.png'; // Import default image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Products = ({ searchQuery, addToOrder }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

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

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddToOrder = () => {
        if (selectedProduct) {
            addToOrder({
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                quantity: quantity
            });
            setSelectedProduct(null);
            setQuantity(1);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.productList}>
                {filteredProducts.map((product) => (
                    <div key={product.id} className={styles.productContainer} onClick={() => handleProductClick(product.id)}>
                        <img src={product.image || sampleProduct} alt={product.name} className={styles.productImage} /> {/* Use || operator to fallback to sampleProduct */}
                        <div className={styles.productName}>{product.name}</div>
                        <div className={styles.productDetails}>
                            <div className={styles.productCategory}>{product.category.name}</div>
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
                        <img src={selectedProduct.image || sampleProduct} alt={selectedProduct.name} className={styles.productModalImage} />
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
                            <button className={styles.addToOrderButton} onClick={handleAddToOrder}>
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
