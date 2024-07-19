import React, { useState, useEffect } from 'react';
import styles from './product.module.css';
import sampleProduct from '../assets/sample.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

//Component to display the list of products
const Products = ({ searchQuery, addToOrder }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    // Fetches products from the backend API
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://sposs-backend.onrender.com/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            const activeProducts = data.filter(product => !product.deleted); // Filter out deleted products
            setProducts(activeProducts);
            setLoading(false); // Set loading to false after products are fetched
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Handles click event to select a product
    const handleProductClick = (productId) => {
        const product = products.find(p => p.id === productId);
        setSelectedProduct(product);
        setQuantity(1);
    };

    // Handles closing the product modal
    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    // Handles changes in the quantity input
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    // Increments the quantity by 1
    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    // Decrements the quantity by 1 if greater than 1
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Filters products based on the search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handles adding a product to the order
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
            {loading && <p>Loading products...</p>}
            {!loading && filteredProducts.length === 0 && <p>No products found.</p>}
            <div className={styles.productList}>
                {filteredProducts.map((product) => (
                    <div key={product.id} className={styles.productContainer} onClick={() => handleProductClick(product.id)}>
                        <img src={product.image || sampleProduct} alt={product.name} className={styles.productImage} /> {/* Use fallback image */}
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
