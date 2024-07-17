import React, { useState } from 'react';
import styles from './adminproduct.module.css';
import sampleProduct from '../assets/sample.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTimesCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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

const ManageProduct = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.productList}>
                {products.map((product) => (
                    <div key={product.id} className={styles.productContainer}>
                        <button className={styles.editButton} onClick={openModal}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className={styles.deleteButton} onClick={null/*null muna*/}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                        
                        <img src={product.image} alt={product.name} className={styles.productImage} />
                        <div className={styles.productName}>{product.name}</div>
                        <div className={styles.productDetails}>
                            <div className={styles.productCategory}>{product.category}</div>
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
                            <h2>Product Modal</h2>
                        </div>
                        <div className={styles.modalBody}>
                            <p>formmmmmmm</p>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={closeModal}>Cancel</button>
                            <button onClick={closeModal}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProduct;
