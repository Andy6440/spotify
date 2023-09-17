import { Image } from './General'

export interface User {
    id: string;
    email: string;
    profile:Profile ;
    AccessToken:AccessToken,
    refresh_token: string
}

export interface AccessToken {  
    access_token : string
    refresh_token : string|null,
    expires_in : number,
    scope : string
    token_type: string
}

export interface Profile {
    display_name: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: Image[];
    type: string;
    uri: string;
    followers: {
        href: string | null;
        total: number;
    };
    country: string;
    product: string;
    explicit_content: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    email: string;
}

