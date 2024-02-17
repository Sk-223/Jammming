import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import './App.css';


function App() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [tracks, setTracks] = useState([
    { id: 1, name: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
    { id: 2, name: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
    { id: 3, name: 'Song 3', artist: 'Artist 3', album: 'Album 3' }
  ]);
  
  const filterTracks = (input) => {
    return tracks.filter(track =>
      track.name.toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleSearchInput = (input) => {
    setSearchInput(input);
    setSearchResults(filterTracks(input));
  }

  return (
    <div className="App">
      <SearchBar setSearchInput={handleSearchInput}/>
      <SearchResults tracks={searchResults} searchInput={searchInput}/>
    </div>
  );
}

export default App;
