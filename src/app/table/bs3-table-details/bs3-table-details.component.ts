import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { Log, Level } from 'ng2-logger/ng2-logger';

const log = Log.create('bs3-table-details', Level.__NOTHING);


@Component({
    selector: 'bs3-table-details',
    templateUrl: './bs3-table-details.component.html',
    styleUrls: ['./bs3-table-details.component.scss']
})
export class Bs3TableDetails implements OnInit {

    @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() backButton: string = 'Go back';

    constructor() { }

    ngOnInit() {

    }


}
