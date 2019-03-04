import { _MatChipListMixinBase } from '@angular/material';

export interface OpenLibraryBook {
    author_name: string;
    title: string;
    cover_i: number;
    isbn: string[];
    id_googreads: string[];
    id_amazon: string[];
    _covers: BookCoverURLs;
    subject: string[];
    publich_date: string[];
    publisher: string[];
    key: string;
    edition_key: string[];
}

export interface BookDetails {
    title: string;
    first_publish_date: string;
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

export class OpenLibrarySearchResponseWrapper {
    start: number = 0;
    numFound: number = 0;
    docs: OpenLibraryBookWrapper[] = [];

    private _subjects: string[];

    constructor(obj?: OpenLibrarySearchResponse) {
        if (obj) {
            this.start = obj.start;
            this.numFound = obj.numFound;
            this.docs = obj.docs.map(x => new OpenLibraryBookWrapper(x));
            this._subjects = getSubjects(this.docs);
        }
    }

    get subjects() {
        return this._subjects;
    }
}

function getSubjects(docs: OpenLibraryBookWrapper[]) {
    let tmp = docs
        .reduce((p, v) => [...p, ...v.obj.subject], [])
        .filter(x => !!x);
    return Array.from(new Set(tmp)).sort();
}

function getCovers(obj: OpenLibraryBook) {
    let key: string = '';
    if (obj.cover_i) {
        key = obj.cover_i.toString();
    }
    else if (obj.isbn) {
        key = obj.isbn[0];
    }
    return {
        small: `http://covers.openlibrary.org/b/id/${key}-S.jpg`,
        medium: `http://covers.openlibrary.org/b/id/${key}-M.jpg`,
        large: `http://covers.openlibrary.org/b/id/${key}-L.jpg`,
    };
}

export class OpenLibraryBookWrapper {
    _wrapped: OpenLibraryBook;
    _covers: BookCoverURLs;
    constructor(wrapped: OpenLibraryBook) {
        this._wrapped = wrapped;

        this._covers = getCovers(wrapped);
    }

    get covers(): BookCoverURLs {
        return this._covers;
    }

    get obj(): OpenLibraryBook {
        return this._wrapped;
    }

    get olid(): string {
        if (Array.isArray(this._wrapped.edition_key) && this._wrapped.edition_key.length > 0) {
            return this._wrapped.edition_key[0];
        }
        let s = this._wrapped.key.split('/');
        return s[s.length - 1];
    }
}

export interface OpenLibraryBookDetails {
    title: string;
    subtitle: string;
    isbn10: string[];
    isbn13: string[];
    author: { name: string, key: string }[]
    by_statement: string;
    edition_name: string;
    weight: string;
    pagination: string;
    publish_date: string;
    publishers: string[];
    covers: string[];
}
export class OpenLibraryBookDetailsWrapper {
    private _wrapped: OpenLibraryBookDetails;

    constructor(wrapped: OpenLibraryBookDetails) {
        this._wrapped = wrapped;

    }

    get obj(): OpenLibraryBookDetails {
        return this._wrapped;
    }

    get isbn10(): string | null {
        return Array.isArray(this.obj['isbn_10']) && this.obj['isbn_10'].length > 0
            ? this.obj['isbn_10'][0]
            : null;
    }

    get isbn13(): string | null {
        return Array.isArray(this.obj['isbn_13']) && this.obj['isbn_13'].length > 0
            ? this.obj['isbn_13'][0]
            : null;
    }

    get isbn(): string | null {
        return this.isbn10 || this.isbn13;
    }

    get amazon(): string | null {
        return `https://www.amazon.com/gp/product/${this.isbn}`;
    }

    get google(): string | null {
        return `http://books.google.com/books?vid=ISBN${this.isbn}`;
    }

    get cover(): string | null {
        let key: string | null;
        if (Array.isArray(this.obj.covers) && this.obj.covers.length > 0) {
            key = this.obj.covers[0];
        } else {
            key = this.isbn ? this.isbn : null
        }
        return key
            ? `http://covers.openlibrary.org/b/id/${key}-L.jpg`
            : null;
    }
}





