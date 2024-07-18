import React, { useState } from 'react';
import styles from './search.module.css';

//Search bar component for filtering products
const Search = ({ setSearchQuery }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    setSearchQuery(inputValue); // Pass query to parent component
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search products..."
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
