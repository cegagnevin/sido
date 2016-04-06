/**
 * Created by mvincent on 24/10/2015.
 */
import {Component, Input, View, ApplicationRef} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {OnInit} from "angular2/core";
import {UserService} from "./services/UserService";

@Component({
    selector: 'home-app',
    providers: [UserService]
})
@View({
    templateUrl: './templates/home.html',
    styleUrls: ['./css/quizz.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class AppComponent {

    public connected: boolean = false;
    public currentMenu: string = null;

    constructor(private router: Router) {
        console.log('Home loaded');
        this.goHome();
    }

    goHome() {

    }
};
