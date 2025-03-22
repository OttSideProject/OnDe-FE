'use client';

import { useState, useEffect } from 'react';
import { getSearchSuggestions } from '@/shared/api/actions';
import styles from './SearchSuggestions.module.css';

type SearchSuggestionsProps = {
  searchTerm: string;
  onSelect?: (suggestion: string) => void;
};

const SearchSuggestions = ({
  searchTerm,
  onSelect,
}: SearchSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim()) {
        const result = await getSearchSuggestions(searchTerm);
        setSuggestions(result);
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [searchTerm]);

  if (!suggestions.length) {
    return null;
  }

  return (
    <div className={styles.suggestionsContainer}>
      <h3>추천 검색어</h3>
      <ul className={styles.suggestionsList}>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className={styles.suggestionItem}
            onClick={() => onSelect?.(suggestion)}
          >
            <img
              src="/assets/images/icons/search-suggestion.svg"
              alt="suggestion"
            />
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSuggestions;
