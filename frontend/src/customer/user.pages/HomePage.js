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

    return (
        <div className="container">
            <div className="products">
                <Search setSearchQuery={setSearchQuery} />
                <Products searchQuery={searchQuery} addToOrder={addToOrder} />
            </div>
            <div className="receipt">
                <Receipt selectedItems={selectedItems} />
            </div>
        </div>
    );
};

export default HomePage;
