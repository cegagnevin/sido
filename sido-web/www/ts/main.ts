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
import {RoundComponent} from './components/RoundComponent';
import {Facade} from "./Facade";
import {User} from "./models";
import {Round} from "./models";

@Component({
    providers: [UserService]
})
@View({
    templateUrl: './templates/home.html',
    styleUrls: ['./css/quizz.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES, RoundComponent]
})
export class AppComponent {

    public latitude:number;
    public longitude:number;
    user: User;
    round: Round;

    constructor() {
        console.log('Home loaded');
        this.user = <User>JSON.parse(localStorage.getItem('user'));
        console.log(this.round);
        this.round = this.user.rounds[+localStorage.getItem('currentRound')];
    }
}
