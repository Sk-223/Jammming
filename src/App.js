import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import PlayList from './PlayList';
import Spotify from './Spotify';
import './App.css';


function App() {
  const [searchInput, setSearchInput] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playListName, setPlayListName] = useState('My Playlist');
  const [playListTracks, setPlayListTracks] = useState([]);
  
  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  const savePlayListName = (newName) => {
    setPlayListName(newName);
  };

  const addTrackToPlayList = (track) => {
    // Check if the track already exists in playlist by comparing ids
    if(!playListTracks.some(t => t.id === track.id)) {
      setPlayListTracks([...playListTracks, {...track, uri: track.uri}]);
    }
  };

  const removeTrackFromPlayList = (trackToRemove) => {
    // Filter out the track to remove from the playlist based on id
    const updatedPlayListTracks = playListTracks.filter(track => track.id !== trackToRemove.id);
    setPlayListTracks(updatedPlayListTracks);
  };

  const savePlaylistToSpotify = () => {
    Spotify.savePlaylist(playListName, playListTracks)
      .then(() => {
        // Reset playlist
      setPlayListName('My Playlist');
      setPlayListTracks([]);
      })
      .catch(error => {
        console.log('Error saving playlist:', error);
      });
  };
  
  const updateTracks = (searchedTracks) => {
    setTracks(searchedTracks);
  };

  const search = (query) => {
    setSearchInput(query);
    Spotify.search(query, updateTracks);
  };

  const handleSearchButtonClick = () => {
    search(searchInput);
  };

  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} onSearch={search} />
      <SearchResults tracks={tracks} searchInput={searchInput} onAddTrack={addTrackToPlayList} onSearchButtonClick={handleSearchButtonClick} />
      <PlayList playListName={playListName} playListTracks={playListTracks} onSavePlayListName={savePlayListName} onRemoveTrack={removeTrackFromPlayList} onSavePlaylistToSpotify={savePlaylistToSpotify} />
    </div>
  );
}

export default App;
