import React from "react";

// Component that renders a single track item
function Track ({ track, onAddTrack, isRemoval, onRemoveTrack }) {
    const actionButton = isRemoval ? (
        <button onClick={() => onRemoveTrack(track)} alt="Remove from Playlist" >-</button>
    ) : (
        <button onClick={() => onAddTrack(track)} alt="Add to Playlist" >+</button>
    );

    return (
        <div>
            <h3>{track.name}</h3>
            <p>{track.artist}</p>
            <p>{track.album}</p>
            {actionButton}
        </div>
    );
}

export default Track;