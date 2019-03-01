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






export class OpenLibraryBookWrapper {
    _wrapped: OpenLibraryBook;
    _covers: BookCoverURLs;
    constructor(wrapped: OpenLibraryBook) {
        this._wrapped = wrapped;

        this._covers = getCovers(wrapped);
    }

    get covers() {
        return this._covers;
    }

    get obj() {
        return this._wrapped;
    }
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

