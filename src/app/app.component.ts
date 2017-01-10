/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';

import { AppState } from './app.service';

require('!style-loader!css-loader!@angular/material/core/theming/prebuilt/indigo-pink.css')
require('!style-loader!css-loader!bootstrap/dist/css/bootstrap.css');
require('!style-loader!css-loader!assets/vendor/highlight/vs.min.css');

require('!script-loader!assets/vendor/highlight/highlight.min.js');
require('!script-loader!assets/vendor/highlight/typescript.min.js');

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector:      'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls:     [
    './app.style.css'
  ],
  template:      `
    <nav class="navbar navbar-light bg-faded" role="navigation" id="top-nav">
    <span class="navbar-brand">Viadialog Components</span>
    
</nav>
<router-outlet></router-outlet>

  `
})
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name             = 'Angular 2 Webpack Starter';
  url              = 'https://twitter.com/AngularClass';

  constructor(public appState: AppState,
              private viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
