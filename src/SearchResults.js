import React from "react";
import TrackList from "./TrackList";

function SearchResults({ tracks, searchInput }) {
    const filteredTracks = tracks.filter(track =>
        track.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div>
            <TrackList tracks={filteredTracks} />
        </div>
    );
}

export default SearchResults;