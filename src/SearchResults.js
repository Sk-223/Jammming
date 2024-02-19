import React from "react";
import TrackList from "./TrackList";

// Component that filters the tracks based on user search input and renders the results
function SearchResults({ tracks, searchInput, onAddTrack }) {
    const filteredTracks = tracks.filter(track =>
        track.name.toLowerCase().replace(/\s/g, '').includes(searchInput.toLowerCase().replace(/\s/g, '')) ||
        track.artist.toLowerCase().replace(/\s/g, '').includes(searchInput.toLowerCase().replace(/\s/g, '')) ||
        track.album.toLowerCase().replace(/\s/g, '').includes(searchInput.toLowerCase().replace(/\s/g, ''))
    );

    return (
        <div>
            <TrackList tracks={filteredTracks} onAddTrack={onAddTrack} />
        </div>
    );
}

export default SearchResults;