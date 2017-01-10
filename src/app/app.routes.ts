import { Routes } from '@angular/router';

import { NoContent } from './no-content';
import { ElementListComponent } from './element-list/element-list.component';
import { ExampleFormComponent } from './example-form/example-form.component';

// AngularClass
// import { provideWebpack } from '@angularclass/webpack-toolkit';
// import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';


export const ROUTES: Routes = [
  {path: '', component: ElementListComponent, pathMatch: 'full'},
  {path: 'list', component: ElementListComponent},
  {path: 'example-form', component: ExampleFormComponent},
  {path: '**', redirectTo: '/list', pathMatch: 'full'}
];
