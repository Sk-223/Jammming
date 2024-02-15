import React from "react";

// Component responsible for rendering search bar and handling user input
function SearchBar({ setSearchInput }) {
    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    return (
        <div>
            <input
                type='text'
                placeholder="Search..."
                onChange={handleInputChange} 
            />
        </div>
    )
}

export default SearchBar;