import React, { useContext } from 'react';
import { FiSearch } from 'react-icons/fi'; // magnifying glass icon
import CommunitySearchContext from '../../../context/CommunitySearchContext';

interface SearchBarProps {
  placeholder?: string; // Optional placeholder for the search input
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search by name" }) => {
  const context = useContext(CommunitySearchContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    context.setSearchTerm(value);
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <div className="relative flex items-center">
        <FiSearch className="absolute left-3 text-gray-400" /> {/* Magnifying glass icon */}
        <input
          type="text"
          placeholder={placeholder}
          value={context.searchTerm}
          onChange={handleInputChange}
          className="w-full p-2 pl-10 border border-gray-300 rounded-md" // Adjust padding for the icon
        />
      </div>
    </div>
  );
};

export default SearchBar;
