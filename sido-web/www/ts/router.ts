/**
 * Created by mvincent on 12/01/2016.
 */
import {Component, Injectable} from 'angular2/core';
import {Router, RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {AppComponent} from "./main";
import {CustomerComponent} from "./components/CustomerComponent"

@Component({
    selector: 'my-app',
    template: `<div><img src="./img/logo.jpg" style="width: 100%; cursor: hand" (click)="goHome()"></div>
               <router-outlet></router-outlet>
               <div class="panel-footer" style="margin-top: 10px;">Copyright © Sopra-Steria 2016
               <a href="mailto:matthieu.vincent@soprasteria.com?subject=Quizz application request
                &cc=david.capelani@soprasteria.com">contact us</a>
               </div>`,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', component: AppComponent, name: 'Home'}
    {path: '/customers/:id', component: CustomerComponent, name: 'Customer'}
])
export class InternalRouter {
    constructor(private router: Router) {
        this.router.navigate(['Home']);
    }

    goHome() {
        this.router.navigate(['Home']);
        //location.href = "/";
    }
}
