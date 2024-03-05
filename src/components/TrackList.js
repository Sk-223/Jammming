import React from "react";
import Track from "./Track";

// Component that renders a list of tracks
function TrackList({ tracks, onAddTrack, isRemoval, onRemoveTrack }) {
    return (
        <div>
                {tracks.map((track => (
                    <div key={track.id}>
                        <Track 
                            track={track} 
                            onAddTrack={onAddTrack}
                            isRemoval={isRemoval}
                            onRemoveTrack={onRemoveTrack}
                        />
                    </div>
                )))}
        </div>
    );
}

export default TrackList;