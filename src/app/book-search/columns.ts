export interface ColumnData {
    key: string,
    name: string,
    enabled: boolean
}

const storageKey = 'BookSearchTableColumns';

const columns: ColumnData[] = [
    { key: 'image', name: 'Image', enabled: true },
    { key: 'title', name: 'Title', enabled: true },
    { key: 'author_name', name: 'Authors', enabled: true },
    { key: 'publisher', name: 'Publishers', enabled: true},
    { key: 'publish_date', name: 'Publish Dates', enabled: true},
    { key: 'isbn', name: 'ISBN', enabled: true },
];


const save = (data: ColumnData[]) => {
    console.log('saved columns:', data);
    localStorage.setItem(storageKey, JSON.stringify(data));
}

export const getColumns = () : ColumnData[] => {
    let s = localStorage.getItem(storageKey);
    if (!s) {
        save(columns);
        return columns;
    } else {
        let saved: ColumnData[] = JSON.parse(s);
        return columns.map( x => {
            let m = saved.find(s => s.key === x.key);
            return m ? {...x, ...m} : x;
        })
    }
};


export const updateColumns = (enabled: string[]) : ColumnData[] => {
    let res = columns.map( c => {
        c.enabled = enabled.find(x => x === c.key) ? true : false;
        return c;
    });
    save(res);
    return res;
};
