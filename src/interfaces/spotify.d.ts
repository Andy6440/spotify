export interface SpotifyTrack {
    album: {
        name: string;
        release_date: string;
    };
    artists: SpotifyArtist[];
    name: string;
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
    albumName: string;
    albumReleaseDate: string;
    artists: Artist[];
    trackName: string;
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