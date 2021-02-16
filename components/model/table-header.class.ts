import { SortType } from './sort-type';

export class TableHeader {
    sort: SortType;
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sortBy() {
        switch (this.sort) {
            case undefined || null:
                this.sort = 'ASC';
                break;
            case 'ASC':
                this.sort = 'DESC';
                break;
            case 'DESC':
                this.sort = undefined;
                break;
            default:
                console.error('BAD SORT SECIFICATION');
        }
    };

}
