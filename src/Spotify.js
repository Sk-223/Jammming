const Spotify = {
    clientId: '',
    clientSecret: '',
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

    async savePlaylist(playlistName, trackURIs) {
        try {
            if (!playlistName || !trackURIs.length) {
                return;
            }

            if(!this.accessToken) {
                await this.getAccessToken();
            }

            const headers = {
                Authorization: `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            };

            // Get the current user's ID
            const meResponse = await fetch('https://api.spotify.com/v1/me', { headers });
            if (!meResponse.ok) {
                throw new Error('Failed to get user ID');
            }
            const meJson = await meResponse.json();
            const userID = meJson.id;

            // Create a new playlist
            const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ name: playlistName })
        });

        if (!createPlaylistResponse.ok) {
            throw new Error('Failed to create playlist');
        }

        const createPlaylistJson = await createPlaylistResponse.json();
        const playlistID = createPlaylistJson.id;

        // Add tracks to the new playlist
        const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ uris: trackURIs })
        });
        if (!addTracksResponse.ok) {
            throw new Error('Failed to add tracks to playlist');
        }

        console.log('Playlist saved successfully');
    } catch (error) {
        console.error(error);
    }
  }
};


export default Spotify;
