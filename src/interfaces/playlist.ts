
export interface CreatePlaylist {
    name: string;
    description: string;
    public: boolean
}
export interface SaveItems {
    traks: string[];
    position: number
}

export interface Playlist {
    name: string;
    id: string;
    external_urls: ExternalUrls;
    public: boolean
    tracks:Tracks
}


export interface ExternalUrls {
    spotify: string;
}
export interface Tracks {
    items: Item[];
}
export interface Item {
    added_at: string;
    track: Track
}

export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
export interface Album {
    album_type: string;
    artists: Artist[];
    external_urls: ExternalUrls;
    id: string;
    name: string;
    release_date: string;
    total_tracks: number;
  }
  
export interface Track {
    album: Album;
    artists: Artist[];
    external_urls: ExternalUrls;
    id: string;
    name: string;
    popularity: number;
    track: boolean;
    track_number: number;
    type: string;
  }