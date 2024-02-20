import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import PlayList from './PlayList';
import Spotify from './Spotify';
import './App.css';


function App() {
  const [searchInput, setSearchInput] = useState('');
  const [tracks, setTracks] = useState([
    { id: 1, name: 'Song 1', artist: 'Artist 1', album: 'Album 1', uri: 'spotify:track:1A2B3C4D5E6F' },
    { id: 2, name: 'Song 2', artist: 'Artist 2', album: 'Album 2', uri: 'spotify:track:1A2B3C4D5E6G' },
    { id: 3, name: 'Song 3', artist: 'Artist 3', album: 'Album 3', uri: 'spotify:track:1A2B3C4D5E6H' }
  ]);
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
    if(Spotify.isAccessTokenValid()) {
      savePlaylistToSpotify();
    } else {
      Spotify.initiateAuthFlow();
    };
    // Gather playlist data
    const playlistData = {
      name: playListName,
      tracks: playListTracks.map(track => track.uri)
    };
    console.log('Saving playlist to Spotify:', playlistData);
    // Reset playlist
    setPlayListName('My Playlist');
    setPlayListTracks([]);
  };

  return (
    <div className="App">
      <SearchBar setSearchInput={setSearchInput} />
      <SearchResults tracks={tracks} searchInput={searchInput} onAddTrack={addTrackToPlayList} />
      <PlayList playListName={playListName} playListTracks={playListTracks} onSavePlayListName={savePlayListName} onRemoveTrack={removeTrackFromPlayList} onSavePlaylistToSpotify={savePlaylistToSpotify} />
    </div>
  );
}

export default App;
