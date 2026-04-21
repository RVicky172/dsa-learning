import React from 'react';
import { Search } from 'lucide-react';
import styles from './Hero.module.css';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className={styles.searchContainer}>
      <Search size={20} className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Search topics..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
