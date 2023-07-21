export interface SpotifyTrack {
    name: string;
    artists: SpotifyArtist[];
    album: {
        name: string;
        release_date: string;
    };
    external_urls: {
        spotify: string;
    };
}

export interface SpotifyArtist {
    name: string;
    external_urls: {
        spotify: string;
    };
}

export interface Track {
    trackName: string;
    artists: Artist[];
    albumName: string;
    albumReleaseDate: string;
    trackUrl: string;
}
export interface TopTrack {
    items: SpotifyTrack[];
}

export interface Artist {
    name: string;
    spotifyUrl: string;
}

export interface SpotifyAccess {
    access_token: string;
    token_type: string;
    expires_in: number;
  }