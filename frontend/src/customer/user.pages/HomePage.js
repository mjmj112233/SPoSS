import React, { useState } from 'react';
import Products from '../components/Products';
import Receipt from '../components/Receipt';
import Search from '../components/Search';
import './homepage.css';

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container">
            <div className="products">
                <Search setSearchQuery={setSearchQuery} />
                <Products searchQuery={searchQuery} />
            </div>
            <div className="receipt">
                <Receipt />
            </div>
        </div>
    );
};

export default HomePage;
