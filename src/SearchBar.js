import React from "react";

// Component responsible for rendering search bar and handling user input
function SearchBar({ setSearchInput }) {
    
    const handleInputChange = ({ target }) => {
        setSearchInput(target.value)
    };

    return (
        <div>
            <input
                type='text'
                placeholder="Search..."
                // This is where the initial input change event handler is triggered by the user
                onChange={handleInputChange} 
            />
        </div>
    );
};

export default SearchBar;