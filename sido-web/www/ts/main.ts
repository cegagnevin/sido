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

    constructor(private uService : UserService, private router: Router) {
        console.log('Home loaded');
        this.goHome();
    }

    goHome() {
        this.currentMenu = '';
        let token = localStorage.getItem('token');

        if (token) {
            this.uService.checkSession(token)
                .subscribe(
                    data => this.relog(data),
                    err =>  this.redirectToHome(),
                    () => console.log('Session checked')
                )
        } else {
            this.redirectToHome();
        }
    }

    private relog(data) {
        if (data) {
            console.log('Session still valid, navigate to employee home');
            this.router.navigate(['EmployeeHome']);
        } else {
            this.redirectToHome();
        }
    }

    private redirectToHome() {
        console.log('No session valid, navigate to global homepage');
        this.connected = false;
        localStorage.removeItem('employee');
        localStorage.removeItem('candidateid');
        this.router.navigate(['Home']);
    }

    selectMenu(menu:string) {
        this.currentMenu = menu;
        console.log('current main menu: ' + this.currentMenu)
    }

    public notHome():void {
        this.connected = true;
    }
};
