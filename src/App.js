import React, { useState } from 'react';
import SearchBar from './SearchBar';
import './App.css';

function App() {
  const [searchInput, setSearchInput] = useState('');
  return (
    <div className="App">
      <SearchBar setSearchInput={setSearchInput}/>
    </div>
  );
}

export default App;
