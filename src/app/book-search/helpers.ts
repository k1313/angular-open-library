import { OpenLibraryBook } from '../open-library-book';
import { ColumnData } from './columns';


export function getSubjects(docs: OpenLibraryBook[]): string[] {
  let res: string[] = [];
  docs.forEach(v => {
    res = res.concat(v.subject);
  });
  return Array.from(new Set(res.filter(x => !!x))).sort();
}
export function getDisplayedColumns(data: ColumnData[]): string[] {
  return data.filter(x => x.enabled).map(x => x.key);
}

export function addCovers(book: OpenLibraryBook): OpenLibraryBook {
  let key: string = '';
  if (book.cover_i) {
    key = book.cover_i.toString();
  }
  else if (book.isbn) {
    key = book.isbn[0];
  }
  book._covers = {
    small: `http://covers.openlibrary.org/b/id/${key}-S.jpg`,
    medium: `http://covers.openlibrary.org/b/id/${key}-M.jpg`,
    large: `http://covers.openlibrary.org/b/id/${key}-L.jpg`,
  };
  return book;
}

export default {
    getSubjects, getDisplayedColumns, addCovers   
}