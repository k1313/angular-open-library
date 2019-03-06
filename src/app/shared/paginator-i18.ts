import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MatPaginationIntlService extends MatPaginatorIntl {

    firstPageLabel = 'First page';
    itemsPerPageLabel = 'Items per page';
    lastPageLabel = 'Last page';
    nextPageLabel = 'Next page';
    previousPageLabel = 'Previous page';
    of = 'of';

    constructor(private translate: TranslateService) {
        super();
        this.translate.onLangChange.subscribe( e => this.translateLabels(e.translations) );
        this.translateLabels(this.translate.translations[this.translate.currentLang]);
    }

    getRangeLabel = (page: number, pageSize: number, length: number): string => {

        if (length === 0 || pageSize === 0) {
            return `0 ${this.of} ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = ((page * pageSize) > length) ?
            (Math.ceil(length / pageSize) - 1) * pageSize :
            page * pageSize;

        const endIndex = Math.min(startIndex + pageSize, length);
        return `${startIndex + 1}  -  ${endIndex} ${this.of} ${length}`;
    };

    private translateLabels(translations: any) {
        console.log('tl', translations);
        this.itemsPerPageLabel = translations.SEARCH.PAGER.ITEMS_PER_PAGE || 'Items Per Page';
        this.firstPageLabel = translations.SEARCH.PAGER.FIRST_PAGE || 'First page';
        this.lastPageLabel = translations.SEARCH.PAGER.LAST_PAGE || 'Last page';
        this.nextPageLabel = translations.SEARCH.PAGER.NEXT_PAGE || 'Next page';
        this.previousPageLabel = translations.SEARCH.PAGER.PREV_PAGE || 'Previous page';
        this.of = translations.SEARCH.PAGER.OF || 'of';

        this.changes.next();
    }
}
