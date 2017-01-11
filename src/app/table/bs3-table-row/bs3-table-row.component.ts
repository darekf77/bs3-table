import { Component, OnInit, Input, AfterContentInit, ContentChildren, Type,
    ContentChild, OnChanges, HostBinding, QueryList, ViewEncapsulation } from '@angular/core';
import { Bs3TableCell } from './bs3-table-cell';


import { Log, Level } from 'ng2-logger/ng2-logger';
const log = Log.create('bs3-table-row', Level.__NOTHING);

const id = 'bs3-table-row';

@Component({
    selector: 'tr',
    template: require(`./${id}.component.html`),
    styles: [require(`./${id}.component.scss`)]
})
export class Bs3TableRow implements OnInit, AfterContentInit {

    @ContentChildren(Bs3TableCell) cels: QueryList<Bs3TableCell>;
    @Input() data;

    constructor() {

    }

    ngOnInit() {
        setTimeout(() => {
            log.i('cells lenght', this.cels.length);
        }, 1000);
    }

    ngAfterContentInit() {
        log.i('cells lenght', this.cels.length);
    }

    toArray(o: Object): string[] {
        log.d('object candidate to be array', o);
        let a = [];
        for (let i in o) {
            if (o.hasOwnProperty(i)) {
                a.push(o[i] === undefined ? '-' : o[i]);
            }
        }
        log.d('object transformed', a);
        return a;
    }

    isArray(o: any) {
        return (o instanceof Array);
    }


}
