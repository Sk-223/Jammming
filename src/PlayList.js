import React, { useState } from "react";
import TrackList from "./TrackList";

function PlayList({ playListName, playListTracks, onSavePlayListName, onRemoveTrack, onSavePlaylistToSpotify }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(playListName);

    const handleNameChange = ({target}) => {
        setNewName(target.value)
    };
    // Event handler for saving the title of the playlist name
    const handleNameSave = () => {
        onSavePlayListName(newName);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewName(playListName);
    };

    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            handleNameSave();
        }
    };

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    // Event handler for saving the playlist to spotify
    const handleSavePlayList = () => {
        onSavePlaylistToSpotify();
    };

        return (
        <div>
            {isEditing ? (
                <div> 
                    <input
                        name="playListName"
                        type="text"
                        value={newName}
                        onChange={handleNameChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        autoFocus
                    />
                    <button onClick={handleNameSave}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h2 onClick={handleClick}>{newName}</h2>
                    <button onClick={handleSavePlayList}>Save {newName} to Spotify</button>
                </div>
            )}
            <TrackList 
                tracks={playListTracks} 
                onRemoveTrack={onRemoveTrack}
                isRemoval={true}
            />
        </div>
    );
}

export default PlayList;