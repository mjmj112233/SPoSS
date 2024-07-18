import React, { useState, useEffect } from 'react';
import styles from './adminproduct.module.css';
import sampleProduct from '../assets/sample.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTimesCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [newProductName, setNewProductName] = useState('');
    const [newProductCategory, setNewProductCategory] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Fetch products from the backend
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://sposs-backend.onrender.com/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            const activeProducts = data.filter(product => !product.deleted);
            setProducts(activeProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Fetch categories from the backend
    const fetchCategories = async () => {
        try {
            const response = await fetch('https://sposs-backend.onrender.com/api/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Open and close modals
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        setNewProductName('');
        setNewProductCategory('');
        setNewProductPrice('');
    };
    const openEditModal = (product) => {
        setEditingProduct(product);
        setNewProductName(product.name);
        setNewProductCategory(product.categoryId);
        setNewProductPrice(product.price);
        setEditModal(true);
    };
    const closeEditModal = () => {
        setEditingProduct(null);
        setNewProductName('');
        setNewProductCategory('');
        setNewProductPrice('');
        setEditModal(false);
    };

    // Add a new product
    const addProduct = async () => {
        try {
            const response = await fetch('https://sposs-backend.onrender.com/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newProductName, categoryId: newProductCategory, price: newProductPrice }),
            });
            if (!response.ok) {
                throw new Error('Failed to add product');
            }
            const data = await response.json();
            setProducts([...products, data]);
            closeModal();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    // Delete a product
    const deleteProduct = async (product) => {
        if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
            try {
                const response = await fetch(`https://sposs-backend.onrender.com/api/products/${product.id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete product');
                }
                setProducts(products.filter(prod => prod.id !== product.id));
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    // Update an existing product
    const updateProduct = async () => {
        try {
            const response = await fetch(`https://sposs-backend.onrender.com/api/products/${editingProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newProductName, categoryId: newProductCategory, price: newProductPrice }),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            const updatedProduct = { ...editingProduct, name: newProductName, categoryId: newProductCategory, price: newProductPrice };
            const updatedProducts = products.map(prod => (prod.id === updatedProduct.id ? updatedProduct : prod));
            setProducts(updatedProducts);
            closeEditModal();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <h2>Products</h2>
            <div className={styles.productList}>
                {products.map((product) => (
                    <div key={product.id} className={styles.productContainer}>
                        <button className={styles.editButton} onClick={() => openEditModal(product)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className={styles.deleteButton} onClick={() => deleteProduct(product)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                        <div className={styles.productImage}>
                            <img src={sampleProduct} alt={product.name} />
                        </div>
                        <div className={styles.productName}>{product.name}</div>
                        <div className={styles.productCategory}>{categories.find(cat => cat.id === product.categoryId)?.name}</div>
                        <div className={styles.productPrice}>${product.price}</div>
                    </div>
                ))}
                <div className={styles.addProductContainer} onClick={openModal}>
                    <FontAwesomeIcon icon={faCirclePlus} className={styles.addProductButton} />
                </div>
            </div>

            {/* Add Product Modal */}
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                        <div className={styles.modalHeader}>
                            <h2>Add Product</h2>
                        </div>
                        <div className={styles.modalBody}>
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={newProductName}
                                onChange={(e) => setNewProductName(e.target.value)}
                            />
                            <select
                                value={newProductCategory}
                                onChange={(e) => setNewProductCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Price"
                                value={newProductPrice}
                                onChange={(e) => setNewProductPrice(e.target.value)}
                            />
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={closeModal}>Cancel</button>
                            <button onClick={addProduct}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Product Modal */}
            {editModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={closeEditModal}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                        <div className={styles.modalHeader}>
                            <h2>Edit Product</h2>
                        </div>
                        <div className={styles.modalBody}>
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={newProductName}
                                onChange={(e) => setNewProductName(e.target.value)}
                            />
                            <select
                                value={newProductCategory}
                                onChange={(e) => setNewProductCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Price"
                                value={newProductPrice}
                                onChange={(e) => setNewProductPrice(e.target.value)}
                            />
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={closeEditModal}>Cancel</button>
                            <button onClick={updateProduct}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProduct;
