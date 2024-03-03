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
    const accessToken = Spotify.getAccessToken();
    Spotify.savePlaylistToSpotify({ name: playListName }, playListTracks.map(track => track.uri), accessToken)
      .then(() => {
        setPlayListName('My Playlist');
        setPlayListTracks([]);
      })
      .catch(error => {
        console.log('Error saving playlist:', error);
      });
  };

  const handleSearch = async (query) => {
    try {
      const accessToken = Spotify.getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTracks(data.tracks.items);
      } else {
        throw new Error('Failed to search for tracks');
      }
    } catch (error) {
      console.error('Error searching for tracks:', error);
    }
  };

  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar 
        searchInput={searchInput} 
        setSearchInput={setSearchInput} 
        onSearch={handleSearch} 
      />
      <SearchResults 
        tracks={tracks} 
        searchInput={searchInput} 
        onAddTrack={addTrackToPlayList} 
      />
      <PlayList 
        playListName={playListName} 
        playListTracks={playListTracks} 
        onSavePlayListName={savePlayListName} 
        onRemoveTrack={removeTrackFromPlayList}
        onSavePlaylistToSpotify={savePlaylistToSpotify} 
      />
    </div>
  );
}

export default App;
