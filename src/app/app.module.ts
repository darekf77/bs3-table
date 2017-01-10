import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';


import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MaterialModule } from '@angular/material/module';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { VDDatatableModule } from './element-list';
import { AppState, InternalStateType } from './app.service';
import { App } from './app.component';
import { ElementListComponent } from './element-list/element-list.component';
import { ExampleFormComponent } from './example-form/example-form.component';
import { NoContent } from './no-content';
import { PageScroll } from 'ng2-page-scroll/src/ng2-page-scroll.directive';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { HighlightCodeDirective } from './directives/code-highlight.directive';
import { TextMaskModule } from 'angular2-text-mask';

import { DatatablePreviewComponent } from './element-list/elements/datatable-preview/datatable-preview.component';

import { ViadialogComponentsModule, EN_COMPONENTS, } from "../../index";




type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};



// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState
];

console.log('MaterialModule', MaterialModule)

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [App],
    declarations: [
        App,
        ElementListComponent,
        ExampleFormComponent,
        HighlightCodeDirective,
        NoContent,
        DatatablePreviewComponent
        ,],
    imports: [ // import Angular's modules
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, { useHash: false }),
        Ng2BootstrapModule,
        Ng2PageScrollModule,
        TextMaskModule,
        VDDatatableModule,
        ViadialogComponentsModule,
        MaterialModule.forRoot()
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        APP_PROVIDERS
    ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef, public appState: AppState) { }

    hmrOnInit(store: StoreType) {
        if (!store || !store.state) return;
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // save state
        const state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }

}