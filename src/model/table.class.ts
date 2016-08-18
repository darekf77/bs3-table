import { EventEmitter } from '@angular/core';

import { Subscription, Observable, Subject } from 'rxjs';

import { Log, Level } from 'ng2-logger/ng2-logger';
const log = Log.create('table class', Level.__NOTHING);

import { TableHeader } from './table-header.class';
import { TableConfig } from './table-config.class';
import { Page } from './page';

export interface TransformFn<T> {
    (data: any): T;
};

export class Table<R> {

    selectedRow: R = undefined;

    constructor(...header: string[]) {
        let headers = [];
        header.forEach(name => {
            headers.push(new TableHeader(name));
        });
        this.tableConfig = new TableConfig(headers);
    }

    // rows
    private _rows: R[] = [];
    get rows() {
        return this._rows;
    }
    addRow(...row: R[]) {
        row.forEach(r => this._rows.push(r));
        return this;
    }

    private columns: string[] = [];
    setColumnsFields(...column: string[]) {
        this.columns = column;
        return this;
    }
    private setData(rows: R[]) {
        if (this.columns.length > 0) {
            rows.forEach(row => {
                let o: R = <R>{};
                this.columns.forEach(c => o[c] = row[c]);
                this._rows.push(o);
            });
        } else this._rows = rows;
    }


    // headers
    get headers(): TableHeader[] {
        if (this.tableConfig === undefined) return [];
        return this.tableConfig.headers;
    }

    // page
    get page(): Page {
        if (this.tableConfig !== undefined) return this.tableConfig.page;
    }

    // create defautl headers in constructor
    get config() {
        return this.tableConfig;
    }
    private tableConfig: TableConfig;
    loadConfig(serializedConfig: string) {
        this.tableConfig = TableConfig.deserialize(serializedConfig);
        this.changePage(this.tableConfig.page.number);
        return this.tableConfig;
    }

    saveConfig(): string {
        return TableConfig.serialize(this.tableConfig);
    }

    changePage(n: number = this.tableConfig.page.number) {
        if (n === 0) {
            log.er('Bs3Table: Page cannot be zero');
            return;
        }
        log.i('page changed to ', n);
        this.tableConfig.page.number = n;
        this.subjectDataNeeded.next(this.tableConfig.page);
    }

    protected subjectDataNeeded = new Subject<Page>();
    onDateNeeded: Observable<Page> = this.subjectDataNeeded.asObservable();

    listen(data: Observable<any>, transformFN: TransformFn<R[]> = undefined) {
        if (transformFN !== undefined) {
            data.subscribe(d => this.setData(transformFN(d)));
        } else data.subscribe(d => this.setData(d));
    }


}
