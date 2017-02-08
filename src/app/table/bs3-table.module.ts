import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Bs3TableRow, Bs3TableCell } from './bs3-table-row';
import { Bs3Table } from './bs3-table.component';
import { Bs3TableDetails, Bs3TableDetailsBackBtCmp } from './bs3-table-details';



const components = [
    Bs3Table,
    Bs3TableCell,
    Bs3TableRow,
    Bs3TableDetails,
    Bs3TableDetailsBackBtCmp
]

@NgModule({
    imports: [CommonModule],
    exports: [
        ...components
    ],
    declarations: [
        ...components
    ],
    providers: [],
})
export class BsTableModule { }
