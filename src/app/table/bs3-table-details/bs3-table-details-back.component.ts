import { Component, OnInit, Input, HostListener } from '@angular/core';

import { Table } from '../model';

@Component({
    selector: 'bs3-table-details-back',
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
