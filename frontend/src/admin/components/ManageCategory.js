import React, { useState, useEffect } from 'react';
import styles from './admincategory.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle, faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/categories');
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
        setNewCategoryName('');
    };

    const openEditModal = (category) => {
        setEditingCategory(category);
        setNewCategoryName(category.name);
        setEditModal(true);
    };

    const closeEditModal = () => {
        setEditingCategory(null);
        setNewCategoryName('');
        setEditModal(false);
    };

    const addCategory = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newCategoryName }),
            });
            if (!response.ok) {
                throw new Error('Failed to add category');
            }
            const data = await response.json();
            setCategories([...categories, data]);
            closeModal();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const deleteCategory = async (category) => {
        if (window.confirm(`Are you sure you want to delete ${category.name}?`)) {
            try {
                const response = await fetch(`http://localhost:8080/api/categories/${category.id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete category');
                }
                setCategories(categories.filter(cat => cat.id !== category.id));
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    const updateCategory = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/categories/${editingCategory.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newCategoryName }),
            });
            if (!response.ok) {
                throw new Error('Failed to update category');
            }
            const updatedCategory = { ...editingCategory, name: newCategoryName };
            const updatedCategories = categories.map(cat => (cat.id === updatedCategory.id ? updatedCategory : cat));
            setCategories(updatedCategories);
            closeEditModal();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <h2>Categories</h2>
            <div className={styles.categoryList}>
                {categories.map((category) => (
                    <div key={category.id} className={styles.categoryContainer}>
                        <button className={styles.editButton} onClick={() => openEditModal(category)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className={styles.deleteButton} onClick={() => deleteCategory(category)}>
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
                            <input
                                type="text"
                                placeholder="Category Name"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                            />
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={closeModal}>Cancel</button>
                            <button onClick={addCategory}>Save</button>
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
                            <h2>Edit Category</h2>
                        </div>
                        <div className={styles.modalBody}>
                            <input
                                type="text"
                                placeholder="Category Name"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                            />
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={closeEditModal}>Cancel</button>
                            <button onClick={updateCategory}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCategory;
