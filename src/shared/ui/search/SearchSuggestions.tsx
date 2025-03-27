'use client';

import { useState, useEffect } from 'react';
import { getSearchSuggestions } from '@/shared/api/actions';
import { SearchSuggestion } from '@/shared/api/actions/searchSuggestions';
import styles from './SearchSuggestions.module.css';

type SearchSuggestionsProps = {
  searchTerm: string;
  onSelect?: (suggestion: SearchSuggestion) => void;
  showSuggestions?: boolean;
};

// 검색어를 강조하는 함수 추가
const HighlightedText = ({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  // 대소문자 구분 없이 검색어 위치 찾기
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className={styles.highlightedText}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
};

const SearchSuggestions = ({
  searchTerm,
  onSelect,
  showSuggestions = true,
}: SearchSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim() && showSuggestions) {
        const result = await getSearchSuggestions(searchTerm);
        setSuggestions(result);
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [searchTerm, showSuggestions]);

  if (!suggestions.length || !showSuggestions) {
    return null;
  }

  return (
    <div className={styles.suggestionsContainer}>
      <ul className={styles.suggestionsList}>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className={styles.suggestionItem}
            onClick={() => onSelect?.(suggestion)}
          >
            <HighlightedText text={suggestion.title} highlight={searchTerm} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSuggestions;
