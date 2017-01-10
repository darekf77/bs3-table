import {
    Component, OnInit, Input, ContentChildren, OnDestroy,
    ViewChildren, QueryList, AfterViewInit, AfterContentInit,
    ViewEncapsulation, AfterViewChecked
} from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import { PaginationComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { Log, Level } from 'ng2-logger/ng2-logger';
const log = Log.create('bs3-table', Level.__NOTHING);
log.color = 'blue';

import { Bs3TableRow } from './bs3-table-row';
import { Bs3TableDetails } from './bs3-table-details';
import { Table, SortType, TableHeader, Page } from './model';
import { ExampleRowInterface } from './example';

const id: string = 'bs3-table';

@Component({
    selector: id,
    template: require(`./${id}.component.html`),
    styles: [require(`./${id}.component.scss`)],
    encapsulation: ViewEncapsulation.None
})
export class Bs3Table implements OnInit, OnDestroy, AfterContentInit {

    sortType = SortType;
    @ContentChildren(Bs3TableRow) rowsContent: QueryList<Bs3TableRow>;
    @ContentChildren(Bs3TableDetails) rowsDetails: QueryList<Bs3TableDetails>;

    @Input() id: string;
    @Input() firstText = 'First';
    @Input() lastText = 'Last';
    @Input() nextText = 'Next';
    @Input() prevText = 'Prev';

    changePage(e) {
        this.table.page.number = e.page;
        this.table.changePage();
    }

    @Input() table: Table<any> = new Table<ExampleRowInterface>('Imie', 'Nazwsko', 'Data')
        .addRow({ name: 'asdasd', age: 12, date: new Date() })
        .addRow({ name: ' asdasd', age: 13 });

    use(table: Table<any>) {
        this.table = table;
        this.table.changePage();
    }

    static get(bs3TableId: string): Promise<Bs3Table> {
        log.i('instances', Bs3Table.instances);
        log.i('bs3TableId', bs3TableId);
        return new Promise<Bs3Table>((resove, reject) => {
            setTimeout(() => {
                if (Bs3Table.instances === undefined ||
                    Bs3Table.instances[bs3TableId] === undefined)
                    reject('Bs3Table: no instace with id: ' + bs3TableId);
                resove(Bs3Table.instances[bs3TableId]);
            });
        });
    }
    static instances = {};

    constructor() {
        // let d = this.table.saveConfig();
        // log.i('table serialized', d);
        // log.i('table deserialized', this.table.loadConfig(d));
    }

    ngOnInit() {
        Bs3Table.instances[this.id] = this;

    }

    ngOnDestroy() {
        // Bs3Table.instances[this.id] = undefined;
    }

    ngAfterContentInit() {
        setTimeout(() => {
            log.i('content children (row)', this.rowsContent);
            log.i('conten children (details) ', this.rowsDetails);
            log.i('children length', this.rowsContent.length);
        }, 1000);

    }

    sortBy = (head: TableHeader) => {
        head.sortBy();
        this.table.changePage();
    }



}
