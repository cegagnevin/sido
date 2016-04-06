/**
 * Created by mvincent on 24/10/2015.
 */
import {Component, Input, View, ApplicationRef} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {OnInit} from "angular2/core";

import {UserService} from "./services/UserService";
import {LoginFormComponent} from './components/LoginFormComponent';

@Component({
    selector: 'my-app',
    providers: [UserService]
})
@View({
    templateUrl: './templates/home.html',
    styleUrls: ['./css/quizz.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES, LoginFormComponent]
})
export class AppComponent {

    public connected: boolean = false;
    public currentMenu: string = null;

    public login: string = "default";
    public password: string = "";

    constructor() {
        console.log('Home loaded');
    }


}
