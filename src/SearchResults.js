import React from "react";
import TrackList from "./TrackList";
import Button from "./Button";

// Function to remove diacritics (accents) from a string
const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };  

// Component that filters the tracks based on user search input and renders the results
function SearchResults({ tracks, searchInput, onAddTrack, onSearchButtonClick }) {
    const trackMatchesSearch = (track) => {
        const normalizedSearchInput = removeDiacritics(searchInput.toLowerCase());
        const normalizedTrackName = removeDiacritics(track.name.toLowerCase());
        const normalizedArtistName = removeDiacritics(track.artist.toLowerCase());
        const normalizedAlbumName = removeDiacritics(track.album.toLowerCase());
    
        return (
          normalizedTrackName.includes(normalizedSearchInput) ||
          normalizedArtistName.includes(normalizedSearchInput) ||
          normalizedAlbumName.includes(normalizedSearchInput)
        );
      };
    
      // Filter tracks based on search input
      const filteredTracks = tracks.filter((track) => trackMatchesSearch(track));

    return (
        <div>
          {searchInput && filteredTracks.length > 0 ? (
              <TrackList tracks={filteredTracks} onAddTrack={onAddTrack} />
            ) : null}
        </div>
    );
}

export default SearchResults;