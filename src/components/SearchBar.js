import React from "react";
import Button from "./Button";
import styles from "../styles/SearchBar.module.css";

// Component responsible for rendering search bar and handling user input
function SearchBar({ searchInput, setSearchInput, onSearch }) {
    
    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };
    
    const handleSearchButtonClick = () => {
        onSearch(searchInput);
    };

    const handleKeyDown = (event) => {
        if(event.key === "Enter") {
            onSearch(searchInput);
        }
    };

    return (
        <div>
            <input
                className={styles["search-bar"]}
                name="searchBar"
                type='text'
                placeholder="Search..."
                value={searchInput}
                onChange={handleInputChange} 
                onKeyDown={handleKeyDown}
            />
            <Button onClick={handleSearchButtonClick}>
                Search
            </Button>
        </div>
    );
};

export default SearchBar;