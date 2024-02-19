import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import PlayList from './PlayList';
import './App.css';


function App() {
  const [searchInput, setSearchInput] = useState('');
  const [tracks, setTracks] = useState([
    { id: 1, name: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
    { id: 2, name: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
    { id: 3, name: 'Song 3', artist: 'Artist 3', album: 'Album 3' }
  ]);
  const [playListName, setPlayListName] = useState('My Playlist');
  const [playListTracks, setPlayListTracks] = useState([]);
  
  const savePlayListName = (newName) => {
    setPlayListName(newName);
  };

  const addTrackToPlayList = (track) => {
    if(!playListTracks.some(t => t.id === track.id)) {
      setPlayListTracks([...playListTracks, track]);
    }
  };

  const removeTrackFromPlayList = (trackToRemove) => {
    const updatedPlayListTracks = playListTracks.filter(track => track.id !== trackToRemove.id);
    setPlayListTracks(updatedPlayListTracks);
  };

  return (
    <div className="App">
      <SearchBar setSearchInput={setSearchInput} />
      <SearchResults tracks={tracks} searchInput={searchInput} onAddTrack={addTrackToPlayList} />
      <PlayList playListName={playListName} playListTracks={playListTracks} onSavePlayListName={savePlayListName} onRemoveTrack={removeTrackFromPlayList} />
    </div>
  );
}

export default App;
