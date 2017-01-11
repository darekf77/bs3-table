import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

import { Table, Page } from '../table';
import { Resource, MockingMode, MockRequest } from 'ng2-rest/ng2-rest';

interface DataModel {
  name: string;
  age: number;
  date: Date;
}

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
    .mock({
      $name: "{{name.firstName}}",
      $age: "{{random.number}}",
      $date: "{{date.recent}}"
    }, 200, mockController, 100)
    .save(page)
}


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
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


