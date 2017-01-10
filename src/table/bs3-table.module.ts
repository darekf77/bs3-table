import { NgModule } from '@angular/core';

import { Bs3TableRow, Bs3TableCell } from './bs3-table-row';
import { Bs3Table } from './bs3-table.component';
import { Bs3TableDetails, Bs3TableDetailsBackBtCmp } from './bs3-table-details';

import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';

const components = [
    Bs3Table,
    Bs3TableCell,
    Bs3TableRow,
    Bs3TableDetails,
    Bs3TableDetailsBackBtCmp
]

@NgModule({
    imports: [PaginationModule],
    exports: [
        ...components
    ],
    declarations: [
        ...components
    ],
    providers: [],
})
export class BsTableModule { }
