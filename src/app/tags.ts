export interface FavouriteBook {
    id: string;
    title: string;
    tags: string[];
}


export function getTags(bookId: string): string[] {
    const favourites: FavouriteBook[] = JSON.parse(localStorage.getItem('favourites')) || [];
    const idx = favourites.findIndex(x => x.id === bookId);
    return idx > -1 ? favourites[idx].tags : [];
}

export function saveTags(bookId: string, title: string, tags: string[]): void {
    let favourites: FavouriteBook[] = JSON.parse(localStorage.getItem('favourites')) || [];
    const idx = favourites.findIndex(x => x.id === bookId);
    if (idx > -1) {
        favourites[idx].tags = tags;
    } else {
        favourites.push({ id: bookId, title, tags });
    }
    favourites = favourites.filter(x => x.tags.length > 0);
    localStorage.setItem(`favourites`, JSON.stringify(favourites));
}

export function allTags() {
    const favourites: FavouriteBook[] = JSON.parse(localStorage.getItem('favourites')) || [];
    const all = favourites.reduce((p, c) => [...p, ...c.tags], []);
    return Array.from(new Set(all));
}

export function search(tags: string[]): FavouriteBook[] {
    const favourites: FavouriteBook[] = JSON.parse(localStorage.getItem('favourites')) || [];
    return favourites.filter(x => {
        for (const t of tags) {
            if (x.tags.indexOf(t) > -1) {
                return true;
            }
        }
        return false;
    });
}
