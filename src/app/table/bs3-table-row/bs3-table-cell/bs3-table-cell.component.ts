import { Component, OnInit } from '@angular/core';

const id = 'bs3-table-cell';

@Component({
    selector: 'td',
    template: require(`./${id}.component.html`)
})
export class Bs3TableCell implements OnInit {
    constructor() { }

    ngOnInit() { }



}
