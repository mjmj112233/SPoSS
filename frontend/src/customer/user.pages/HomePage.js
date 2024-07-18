import React, { useState } from 'react';
import Products from '../components/Products';
import Receipt from '../components/Receipt';
import Search from '../components/Search';
import CustomerToAdminButton from '../components/CustomerToAdmin';
import './homepage.css';

//main dashboard for the customer user
const HomePage = () => {
    // State to manage the search query input by the user
    const [searchQuery, setSearchQuery] = useState('');

    // State to manage the list of selected items in the order
    const [selectedItems, setSelectedItems] = useState([]);

    // Handles changes to the search input field
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    //Adds an item to the order
    const addToOrder = (item) => {
        setSelectedItems([...selectedItems, item]);
    };

    //Updates the quantity of a specific item in the order
    const updateItemQuantity = (index, newQuantity) => {
        setSelectedItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems[index].quantity = newQuantity;
            return updatedItems;
        });
    };

    //Removes an item from the order
    const removeItem = (index) => {
        setSelectedItems(prevItems => prevItems.filter((item, i) => i !== index));
    };

    return (
        <div className="container">
            {/* Products component which includes search bar and product listing */}
            <div className="products">
                <Search setSearchQuery={setSearchQuery} />
                <Products searchQuery={searchQuery} addToOrder={addToOrder} />
            </div>

            {/* Receipt component which displays selected items and order summary */}
            <div className="receipt">
                <Receipt
                    selectedItems={selectedItems}
                    updateItemQuantity={updateItemQuantity}
                    removeItem={removeItem}
                />
            </div>

            {/* Button to navigate to admin dashboard if user is an admin */}
            <CustomerToAdminButton />
        </div>
    );
};

export default HomePage;
