const Spotify = {
    initiateAuthFlow() {
        const clientID = 'ba4ae047babc4024b945e50733e56c47';
        const redirectURI = 'http://localhost:3000/callback/';
        const scopes = 'user-read-private user-read-email';
        const responseType = 'token'

        const authURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scopes}`;

        window.location = authURL;
    },

    getAccessToken() {
        const accessToken = window.location.href.match(/access_token=([^&]*)/);
        const expiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if(accessToken && expiresIn) {
            window.history.replaceState(null, null, '/');
            return {
                token: accessToken[1],
                expiresIn: Number(expiresIn[1]),
            };
        } else {
            return null;
        }
    },

    isAccessTokenValid() {
        const accessToken = this.getAccessToken();
        return accessToken !== null && accessToken.expiresIn > Date.now() / 1000;
    },

    async request(url, options = {}) {
        if(!this.isAccessTokenValid()) {

            return Promise.reject(new Error('Access token expired or not found'));
        }
        
        const headers = {
            Authorization: `Bearer ${this.getAccessToken().token}`, 
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const response = await fetch(url, {...options, headers});
        if(response.okay) {
            return response.json();
        } else {
            throw new Error('Request failed');
        }
    },
};

export default Spotify;