import React, { useState } from "react";
import TrackList from "./TrackList";

function PlayList({ playListName, playListTracks, onSavePlayListName, onRemoveTrack }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(playListName);

    const handleNameChange = ({target}) => {
        setNewName(target.value)
    };

    const handleNameSave = () => {
        onSavePlayListName(newName);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewName(playListName);
    };

        return (
        <div>
            {isEditing ? (
                <div> 
                    <input
                        type="text"
                        value={newName}
                        onChange={handleNameChange}
                    />
                    <button onClick={handleNameSave}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            ) : (
                <h2 onClick={() => setIsEditing(true)}>{playListName}</h2>
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