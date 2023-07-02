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

export interface Artist {
    name: string;
    spotifyUrl: string;
}