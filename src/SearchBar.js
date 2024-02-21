import React from "react";

// Component responsible for rendering search bar and handling user input
function SearchBar({ searchInput, setSearchInput, onSearch }) {
    
    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setSearchInput(inputValue);
        onSearch(inputValue);
    };

    return (
        <div>
            <input
                name="searchBar"
                type='text'
                placeholder="Search..."
                value={searchInput}
                onChange={handleInputChange} 
            />
        </div>
    );
};

export default SearchBar;