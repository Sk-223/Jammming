import React from "react";
import TrackList from "./TrackList";

function PlayList({ playListName, playListTracks, onRemoveTrack }) {
    return (
        <div>
            <h2>{playListName}</h2>
            <TrackList 
                tracks={playListTracks} 
                onRemoveTrack={onRemoveTrack}
                isRemoval={true}
            />
        </div>
    );
}

export default PlayList;