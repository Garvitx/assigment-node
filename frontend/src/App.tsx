import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';

interface SuggestionResponse {
  suggestions?: string[];
  error?: string;
}

function App() {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState<boolean>(false);
  const cache = useRef<Map<string, string[]>>(new Map()); // Cache for suggestions

  // Debounce function with TypeScript typing
  const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch suggestions from the proxy server with caching
  const fetchSuggestions = async (searchQuery: string): Promise<void> => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setError(null);
      return;
    }

    // Check cache first
    if (cache.current.has(searchQuery)) {
      setSuggestions(cache.current.get(searchQuery)!);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data: SuggestionResponse = await response.json();
      if (data.error) {
        setError(data.error);
        setSuggestions([]);
      } else {
        const newSuggestions = data.suggestions || [];
        setSuggestions(newSuggestions);
        cache.current.set(searchQuery, newSuggestions); // Cache the result
      }
    } catch (error) {
      setError('Failed to fetch suggestions. Please try again.');
      setSuggestions([]);
    } finally {
      setLoading(false);
      setHighlightedIndex(-1);
    }
  };

  // Memoized debounced fetch function
  const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), []);

  // Trigger API call when query changes
  useEffect(() => {
    if (query) {
      debouncedFetch(query);
    } else {
      setSuggestions([]);
      setError(null);
    }
  }, [query, debouncedFetch]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isFocused || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      setQuery(suggestions[highlightedIndex]);
      setSuggestions([]);
      setIsFocused(false);
    }
  };

  // Voice input handler
  const startVoiceInput = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsFocused(true);
      };

      recognition.onerror = (event: SpeechRecognitionResult) => {
        setError(`Voice recognition failed: ${event.error}`);
      };

      recognition.start();
    } else {
      setError('Sorry, your browser does not support voice input.');
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100'} flex items-center justify-center p-4 transition-colors duration-300`}>
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transform transition-all hover:scale-105 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Searchify</h1>
          <div className="flex space-x-2">
            <button
              onClick={startVoiceInput}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Voice Search"
            >
              🎙️
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            onKeyDown={handleKeyDown}
            placeholder="Search for snacks..."
            aria-autocomplete="list"
            aria-controls="suggestions-list"
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              isFocused ? 'border-indigo-500 dark:border-indigo-400' : 'border-gray-300 dark:border-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 transition-all duration-300`}
          />
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="animate-spin h-5 w-5 text-indigo-500 dark:text-indigo-400" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z" />
              </svg>
            </div>
          )}
        </div>

        {/* Suggestions List */}
        {isFocused && query && (
          <div className="absolute w-full z-10">
            <ul
              id="suggestions-list"
              className="max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md animate-fadeIn"
            >
              {error ? (
                <li className="px-4 py-2 text-red-500 dark:text-red-400">{error}</li>
              ) : suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
                      index === highlightedIndex
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-300'
                    }`}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => {
                      setQuery(suggestion);
                      setSuggestions([]);
                      setIsFocused(false);
                    }}
                  >
                    {suggestion}
                  </li>
                ))
              ) : (
                !loading && (
                  <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                    No suggestions found.
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* Footer Note */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
          Powered by Zepto API
        </p>
      </div>
    </div>
  );
}

export default App;