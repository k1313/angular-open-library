export interface OpenLibraryBook {
  author_name: string;
  title: string;
  cover_i: number;
  isbn: string[];
  id_googreads: string[];
  id_amazon: string[];
  _covers: BookCoverURLs;
  subject: string[];
  publish_date: string[];
  publisher: string[];
  key: string;
  edition_key: string[];
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
  start = 0;
  numFound = 0;
  docs: OpenLibraryBookWrapper[] = [];

  readonly subjects: string[];

  constructor(obj?: OpenLibrarySearchResponse) {
    if (obj) {
      this.start = obj.start;
      this.numFound = obj.numFound;
      this.docs = obj.docs.map(x => new OpenLibraryBookWrapper(x));
      this.subjects = getSubjects(this.docs);
    }
  }

}

function getSubjects(docs: OpenLibraryBookWrapper[]) {
  const tmp = docs
    .reduce((p, v) => [...p, ...v.obj.subject], [])
    .filter(x => !!x);
  return Array.from(new Set(tmp)).sort();
}

function getCovers(obj: OpenLibraryBook) {
  let key = '';
  if (obj.cover_i) {
    key = obj.cover_i.toString();
  } else if (obj.isbn) {
    key = obj.isbn[0];
  }
  return {
    small: `https://covers.openlibrary.org/b/id/${key}-S.jpg`,
    medium: `https://covers.openlibrary.org/b/id/${key}-M.jpg`,
    large: `https://covers.openlibrary.org/b/id/${key}-L.jpg`,
  };
}

export class OpenLibraryBookWrapper {
  private readonly wrapped: OpenLibraryBook;
  readonly covers: BookCoverURLs;

  constructor(wrapped: OpenLibraryBook) {
    this.wrapped = wrapped;
    this.covers = getCovers(wrapped);
  }

  get obj(): OpenLibraryBook {
    return this.wrapped;
  }

  get olid(): string {
    if (Array.isArray(this.wrapped.edition_key) && this.wrapped.edition_key.length > 0) {
      return this.wrapped.edition_key[0];
    }
    const s = this.wrapped.key.split('/');
    return s[s.length - 1];
  }
}

export interface OpenLibraryBookDetails {
  title: string;
  subtitle: string;
  isbn_10: string[];
  isbn_13: string[];
  authors: { name: string, key: string }[];
  by_statement: string;
  edition_name: string;
  weight: string;
  pagination: string;
  publish_date: string;
  publishers: string[];
  covers: string[];
}

export class OpenLibraryBookDetailsWrapper {
  private readonly wrapped: OpenLibraryBookDetails;

  constructor(wrapped: OpenLibraryBookDetails) {
    this.wrapped = wrapped;

  }

  get authors(): string[] | null {
    if (!this.obj.authors) {
      return null;
    }
    return this.obj.authors.map(x => x.name);
  }

  get obj(): OpenLibraryBookDetails {
    return this.wrapped;
  }

  get isbn10(): string | null {
    return Array.isArray(this.obj.isbn_10) && this.obj.isbn_10.length > 0
      ? this.obj.isbn_10[0]
      : null;
  }

  get isbn13(): string | null {
    return Array.isArray(this.obj.isbn_13) && this.obj.isbn_13.length > 0
      ? this.obj.isbn_13[0]
      : null;
  }

  get isbn(): string | null {
    return this.isbn10 || this.isbn13;
  }

  get amazon(): string | null {
    return `https://www.amazon.com/gp/product/${this.isbn}`;
  }

  get google(): string | null {
    return `https://books.google.com/books?vid=ISBN${this.isbn}`;
  }

  get cover(): string | null {
    let key: string | null;
    if (Array.isArray(this.obj.covers) && this.obj.covers.length > 0) {
      key = this.obj.covers[0];
    } else {
      key = this.isbn ? this.isbn : null;
    }
    return key
      ? `https://covers.openlibrary.org/b/id/${key}-L.jpg`
      : null;
  }
}





