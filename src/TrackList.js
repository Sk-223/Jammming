import React from "react";
import Track from "./Track";

function TrackList({ tracks }) {
    return (
        <div>
            <ul>
                {tracks.map((track => (
                    <li key={track.id}>
                        <Track track={track} />
                    </li>
                )))}
            </ul>
        </div>
    );
}

export default TrackList;