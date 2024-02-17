import React from "react";
import Track from "./Track";

// Component that renders a list of tracks
function TrackList({ tracks, onAddTrack, isRemoval, onRemoveTrack }) {
    return (
        <div>
            <ul>
                {tracks.map((track => (
                    <li key={track.id}>
                        <Track 
                            track={track} 
                            onAddTrack={onAddTrack}
                            isRemoval={isRemoval}
                            onRemoveTrack={onRemoveTrack}
                        />
                    </li>
                )))}
            </ul>
        </div>
    );
}

export default TrackList;