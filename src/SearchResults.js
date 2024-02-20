import React from "react";
import TrackList from "./TrackList";

// Component that filters the tracks based on user search input and renders the results
function SearchResults({ tracks, searchInput, onAddTrack }) {
    const filteredTracks = tracks.filter(track =>
        track.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchInput.toLowerCase()) ||
        track.album.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div>
            {searchInput && filteredTracks.length > 0 ? (
                <TrackList tracks={filteredTracks} onAddTrack={onAddTrack} />
            ) : null}
        </div>
    );
}

export default SearchResults;