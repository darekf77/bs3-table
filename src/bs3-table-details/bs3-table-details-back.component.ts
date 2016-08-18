import { Component, OnInit, Input, HostListener } from '@angular/core';

import { Table } from '../model';

const id = 'bs3-table-details-back';

@Component({
    selector: id,
    template: `
        <span class="glyphicon glyphicon-menu-left" ></span>
        <strong> {{backText}} </strong>
    `,
    styles: [
        `
        :host {
            cursor: pointer;
        }
        `
    ]
})
export class Bs3TableDetailsBackBtCmp implements OnInit {

    @HostListener('click') back() {
        this.table.selectedRow = undefined;
    }

    @Input() backText: string = 'Back to list';
    @Input() table: Table<any>;

    constructor() { }

    ngOnInit() { }
}
