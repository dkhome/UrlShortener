export interface ShortenUrl {
    url: string;
    alias: string;
}

export interface ShortenUrlResult extends ShortenUrl {
    isNew: boolean;
}

export enum Status {
    Iddle = 1,
    Pending = 2,
    Success = 3,
    Existing = 4,
    Error = 5
}