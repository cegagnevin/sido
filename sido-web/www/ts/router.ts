/**
 * Created by mvincent on 12/01/2016.
 */
import {Component, Injectable} from 'angular2/core';
import {Router, RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {AppComponent} from "./main";
import {CustomerComponent} from "./components/CustomerComponent"

@Component({
    selector: 'my-app',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/home', component: AppComponent, name: 'Home'},
    {path: '/customers/:id', component: CustomerComponent, name: 'Customer'}
])
export class InternalRouter {
    constructor(private router: Router) {

        //this.router.navigate(['Home']);
    }
}
