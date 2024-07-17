import React, { useState } from 'react';
import Products from '../components/Products';
import Receipt from '../components/Receipt';
import Search from '../components/Search';
import './homepage.css';

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const addToOrder = (item) => {
        setSelectedItems([...selectedItems, item]);
    };

    const updateItemQuantity = (index, newQuantity) => {
        setSelectedItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems[index].quantity = newQuantity;
            return updatedItems;
        });
    };

    const removeItem = (index) => {
        setSelectedItems(prevItems => prevItems.filter((item, i) => i !== index));
    };

    return (
        <div className="container">
            <div className="products">
                <Search setSearchQuery={setSearchQuery} />
                <Products searchQuery={searchQuery} addToOrder={addToOrder} />
            </div>
            <div className="receipt">
                <Receipt
                    selectedItems={selectedItems}
                    updateItemQuantity={updateItemQuantity}
                    removeItem={removeItem}
                />
            </div>
        </div>
    );
};

export default HomePage;
