import React from 'react';
import styles from './search.module.css';

const Search = () => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search products..."
      />
    </div>
  );
};

export default Search;
