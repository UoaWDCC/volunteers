import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; // magnifying glass icon

interface SearchBarProps {
  placeholder?: string; // Optional placeholder for the search input
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search by name" }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <div className="relative flex items-center">
        <FiSearch className="absolute left-3 text-gray-400" /> {/* Magnifying glass icon */}
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full p-2 pl-10 border border-gray-300 rounded-md" // Adjust padding for the icon
        />
      </div>
    </div>
  );
};

export default SearchBar;
