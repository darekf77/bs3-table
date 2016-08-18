import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { Log, Level } from 'ng2-logger/ng2-logger';

const log = Log.create('bs3-table-details', Level.__NOTHING);

const id: string = 'bs3-table-details';

@Component({
    selector: id,
    template: require(`./${id}.component.html`),
    styles: [require(`./${id}.component.scss`)]
})
export class Bs3TableDetails implements OnInit {

    @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() backButton: string = 'Go back';

    constructor() { }

    ngOnInit() {

    }


}
