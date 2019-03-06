export interface ColumnData {
    key: string;
    name: string;
    enabled: boolean;
}

const storageKey = 'BookSearchTableColumns';

const columns: ColumnData[] = [
    { key: 'image', name: 'SEARCH.COLS.Image', enabled: true },
    { key: 'author_name', name: 'SEARCH.COLS.Authors', enabled: true },
    { key: 'title', name: 'SEARCH.COLS.Title', enabled: true },
    { key: 'publisher', name: 'SEARCH.COLS.Publishers', enabled: true},
    { key: 'publish_date', name: 'SEARCH.COLS.PublishDates', enabled: true},
    { key: 'isbn', name: 'SEARCH.COLS.ISBN', enabled: true },
];


const save = (data: ColumnData[]) => {
    console.log('saved columns:', data);
    localStorage.setItem(storageKey, JSON.stringify(data));
};

export const getColumns = (): ColumnData[] => {
    const s = localStorage.getItem(storageKey);
    if (!s) {
        save(columns);
        return columns;
    } else {
        const saved: ColumnData[] = JSON.parse(s);
        return columns.map( column => {
            const m = saved.find(savedColumn => savedColumn.key === column.key);
            return m ? {...column, ...m} : column;
        });
    }
};


export const updateColumns = (enabled: string[]): ColumnData[] => {
    const res = columns.map( c => {
        c.enabled = enabled.find(x => x === c.key) ? true : false;
        return c;
    });
    save(res);
    return res;
};
