'use client';

import { useState, useEffect } from 'react';
import { getSearchSuggestions } from '@/shared/api/actions';

type SearchSuggestionsProps = {
  searchTerm: string;
};

const SearchSuggestions = ({ searchTerm }: SearchSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const result = await getSearchSuggestions(searchTerm);
      setSuggestions(result);
    };
    fetchSuggestions();
  }, [searchTerm]);

  if (!suggestions.length) {
    return null;
  }

  return (
    <ul>
      {suggestions.map((suggestion, index) => (
        <li key={index}>{suggestion}</li>
      ))}
    </ul>
  );
};

export default SearchSuggestions;
