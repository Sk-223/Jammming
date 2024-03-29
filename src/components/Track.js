import React from "react";
import Button from "./Button";

// Component that renders a single track item
function Track ({ track, onAddTrack, isRemoval, onRemoveTrack }) {
    const actionButton = isRemoval ? (
        <Button onClick={() => onRemoveTrack(track)} alt="Remove from Playlist" >-</Button>
    ) : (
        <Button onClick={() => onAddTrack(track)} alt="Add to Playlist" >+</Button>
    );

    return (
        <div>
            <h3>{track.name}</h3>
            <p>{track.artists.map(artist => artist.name).join(', ')}</p>            
            <p>{track.album.name}</p>
            {actionButton}
        </div>
    );
}

export default Track;