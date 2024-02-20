const Spotify = {
    clientId: 'ba4ae047babc4024b945e50733e56c47',
    clientSecret: '2abf4e7c97ff479588014255d66c922a',
    accessToken: '',

    async getAccessToken() {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`
        });

        if (response.ok) {
            const data = await response.json();
            this.accessToken = data.access_token;
        } else {
            throw new Error('Failed to fetch access token');
        }
    },

    async request(url, options = {}) {
        if (!this.accessToken) {
            await this.getAccessToken();
        }
        
        const headers = {
            Authorization: `Bearer ${this.accessToken}`, 
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const response = await fetch(url, {...options, headers});
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Request failed');
        }
    },

    search(query, updateTracksCallback) {
        const url = `https://api.spotify.com/v1/search?type=track&q=${query}`;

        return this.request(url)
            .then(data => {
                if (data.tracks) {
                    const searchedTracks = data.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }));
                    updateTracksCallback(searchedTracks);
                    return searchedTracks;
                } else {
                    return [];
                }
            })
            .catch(error => {
                console.log('Error searching for tracks:', error);
                return [];
            });
    },

    savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs.length) {
            return;
        }
        const headers = {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
        };
        let userID;

        // Get the current user's ID
        return fetch('https://api.spotify.com/v1/me', {
            headers: headers
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to get user ID');
        })
        .then(jsonResponse => {
            userID = jsonResponse.id;
            // Create a new playlist
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ name: playlistName })
            });
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to create playlist');
        })
        .then(jsonResponse => {
            const playlistID = jsonResponse.id;
            // Add tracks to the new playlist
            return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ uris: trackURIs })
            });
        })
        .then(response => {
            if (response.ok) {
                console.log('Playlist saved successfully');
            } else {
                throw new Error('Failed to save playlist');
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
};

export default Spotify;
