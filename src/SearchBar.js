import React from "react";

// Component responsible for rendering search bar and handling user input
function SearchBar({ searchInput, setSearchInput, onSearch }) {
    
    const handleInputChange = ({ target }) => {
        setSearchInput(target.value)
    };

    const handleKeyDown = (event) => {
        if(event.key === "Enter") {
            onSearch(searchInput);
        }
    };

    return (
        <div>
            <input
                name="searchBar"
                type='text'
                placeholder="Search..."
                value={searchInput}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange} 
            />
        </div>
    );
};

export default SearchBar;