bs3-table
=========

Description
-----------

Table module for angular2. Compatibile with bootstrap3.

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
 

 