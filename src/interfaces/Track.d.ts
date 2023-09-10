import { Item } from './playlist'

export interface UserTopTrack {
    href: string; // A link to the Web API endpoint returning the full result of the request.
    limit: number; // The maximum number of items in the response (as set in the query or by default).
    next: string | null; // URL to the next page of items. (null if none)
    offset: number; // The offset of the items returned (as set in the query or by default).
    previous: string | null; // URL to the previous page of items. (null if none)
    total: number; // The total number of items available to return.
    items: Item[]; // Will be one of the following: ArtistObject or TrackObject.
}