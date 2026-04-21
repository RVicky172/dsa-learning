import { Search, Filter } from 'lucide-react';
import styles from './ProblemsPage.module.css';

interface ProblemsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  availableCategories: string[];
  difficulties: string[];
  isMobile?: boolean;
  isSmallPhone?: boolean;
}

const difficultyColors: Record<string, string> = {
  'Easy': '#22c55e',
  'Medium': '#f97316',
  'Hard': '#eab308',
  'Expert': '#ef4444'
};

const ProblemsFilters = ({
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedCategory,
  onCategoryChange,
  availableCategories,
  difficulties,
  isMobile,
  isSmallPhone: _isSmallPhone
}: ProblemsFiltersProps) => {
  return (
    <div className={`glass ${styles.filters}`}>
      <div className={isMobile ? '' : styles.filtersTop} style={isMobile ? { display: 'flex', flexDirection: 'column', gap: '1.5rem' } : {}}>
        {/* Search */}
        <div className={styles.searchContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Difficulty Filter */}
        <div className={styles.difficultyFilterContainer}>
          <Filter size={18} className={styles.difficultyFilterIcon} />
          <div className={styles.difficultyButtons}>
            {difficulties.map(diff => (
              <button
                key={diff}
                onClick={() => onDifficultyChange(diff)}
                className={`${styles.filterButton} ${selectedDifficulty === diff ? styles.active : ''}`}
                style={selectedDifficulty === diff
                  ? { backgroundColor: diff === 'All' ? 'var(--primary-color)' : difficultyColors[diff] || 'var(--primary-color)' }
                  : {}}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className={styles.categoryFilters}>
        {availableCategories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`${styles.categoryButton} ${selectedCategory === cat ? styles.active : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProblemsFilters;
