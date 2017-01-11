bs3-table
=========

Description
-----------

Table module for angular2. Compatibile with bootstrap3.
Quicket way to create table pagination in angular2.


Instalation & Usage
-----------

    npm install bs3-table

inside your **app.module** import module
```ts

    import { Bs3TableModule } from "bs3-table/bs3-table"


    ...    
// inside NgModule
    import: [ Bs3TableModule ]
    ...

```
In component template

```html
 <bs3-table [table]="table" ></bs3-table>
```

inside component:

```ts
 import { Table } from "bs3-table/bs3-table"

export interface ExampleRowInterface {
    name: string;
    age: number;
    date?: Date;
}


...
// inside Component Class
public table: Table<any> = new Table<ExampleRowInterface>('Imie', 'Nazwsko', 'Data')
        .addRow({ name: 'asdasd', age: 12, date: new Date() })
        .addRow({ name: ' asdasd', age: 13 });
...
```

Class **Table** is very fexible and can be use for lots of different purpose, combining data in one place.

[Pagination example ](https://darekf77.github.io/bs3-table)

 ```ts
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

import { Table, Page } from 'bs3-table-bs3-table';
import { Resource, MockingMode, MockRequest } from 'ng2-rest/ng2-rest';

// interface for row
interface DataModel {
  name: string;
  age: number;
  date: Date;
}

// create simple pagination with ng2-rest inside your browser
function mockController(req: MockRequest<DataModel>) {
  req.backend.models = req.backend.models.sort((a, b) => a.age - b.age);
  let page: Page = <Page>req.body;
  return { data: req.backend.getPagination(page.number, page.size) };
}

@Injectable()
export class DataService {
  constructor(private rest: Resource<string, any, any>) {
    Resource.map('api.com', 'http://api.com')
    rest.add('api.com', 'example_data')
    Resource.setMockingMode(MockingMode.MOCKS_ONLY);
  }

  getData = (page: Page) => this.rest.api('api.com', 'example_data')
    // you can comment line below for production version
    .mock({ $name: "{{name.firstName}}", $age: "{{random.number}}", $date: "{{date.recent}}" }, 200, mockController, 100)
    .save(page)
}


@Component({
  selector: 'app-preview',
  template: `<bs3-table [table]="table" ></bs3-table>`
})
export class PreviewComponent implements OnInit {

  constructor(private data: DataService) { }

  public table: Table<any>;

  ngOnInit() {
    this.table = new Table('Imie', 'Nazwisko', 'Data')

    this.table.onDateNeeded.subscribe(page => {
      this.data.getData(page).subscribe((rows: any[]) => {
        this.table.rows.length = 0;
        rows.forEach(r => this.table.addRow(r));
      });
    });

    this.table.changePage();

  }

}



```