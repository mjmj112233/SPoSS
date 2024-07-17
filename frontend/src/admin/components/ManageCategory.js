import React, { useState } from 'react';
import styles from './admincategory.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle, faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    { id: 4, name: 'Category 4' },
];

const ManageCategory = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.mainContainer}>
            <h2>Categories</h2>
            <div className={styles.categoryList}>
                {categories.map((category) => (
                    <div key={category.id} className={styles.categoryContainer}>
                        <button className={styles.editButton} onClick={openModal}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className={styles.deleteButton} onClick={() => alert('Delete functionality not implemented')}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                        <div className={styles.categoryName}>{category.name}</div>
                    </div>
                ))}
                <div className={styles.addCategoryContainer} onClick={openModal}>
                    <FontAwesomeIcon icon={faPlusCircle} className={styles.addCategoryButton} />
                </div>
            </div>

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                        <div className={styles.modalHeader}>
                            <h2>Add Category</h2>
                        </div>
                        <div className={styles.modalBody}>
                            <p>forrmmmmmmmm</p>
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

export default ManageCategory;
