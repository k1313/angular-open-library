export interface OpenLibraryBook {
    author_name: string;
    title: string;
    cover_i: number;
    isbn: string[];
    id_googreads: string[];
    id_amazon: string[];
    _covers: BookCoverURLs;
    subject: string[];
}

export interface BookCoverURLs {
    small: string;
    medium: string;
    large: string;
}

export interface OpenLibrarySearchResponse {
    start: number;
    numFound: number;
    docs: OpenLibraryBook[];
}

