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

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://sposs-backend.onrender.com/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

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

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setNewProductName(product.name);
        setNewProductCategory(product.category.id); // Assuming product.category is an object with an id property
        setNewProductPrice(product.price.toString());
        setEditModal(true);
    };

    const closeEditModal = () => {
        setEditingProduct(null);
        resetForm();
        setEditModal(false);
    };

    const resetForm = () => {
        setNewProductName('');
        setNewProductCategory('');
        setNewProductPrice('');
    };

    const addProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('name', newProductName);
            formData.append('category', newProductCategory); // Assuming category ID is sent as a string
            formData.append('price', newProductPrice);

            // Assign sampleProduct for the image
            formData.append('image', sampleProduct);

            const response = await fetch('https://sposs-backend.onrender.com/api/products', {
                method: 'POST',
                body: formData,
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

    const updateProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('name', newProductName);
            formData.append('category', newProductCategory);
            formData.append('price', newProductPrice);

            formData.append('image', editingProduct.image || sampleProduct);

            const response = await fetch(`https://sposs-backend.onrender.com/api/products/${editingProduct.id}`, {
                method: 'PUT',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            const updatedProduct = { ...editingProduct, name: newProductName, category: { id: newProductCategory }, price: parseFloat(newProductPrice) };
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
                        <img src={product.image || sampleProduct} alt={product.name} className={styles.productImage} />
                        <div className={styles.productName}>{product.name}</div>
                        <div className={styles.productDetails}>
                            <div className={styles.productCategory}>{product.category.name}</div> {/* Assuming category is an object with a name property */}
                            <div className={styles.productPrice}>₱ {product.price}</div>
                        </div>
                    </div>
                ))}
                <div className={styles.addProductContainer} onClick={openModal}>
                    <FontAwesomeIcon icon={faCirclePlus} className={styles.addButton} />
                </div>
            </div>

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
                            <label>Product Name</label>
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={newProductName}
                                onChange={(e) => setNewProductName(e.target.value)}
                            />
                            <label>Category</label>
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
                            <label>Price</label>
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
                            <label>Product Name</label>
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={newProductName}
                                onChange={(e) => setNewProductName(e.target.value)}
                            />
                            <label>Category</label>
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
                            <label>Price</label>
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
