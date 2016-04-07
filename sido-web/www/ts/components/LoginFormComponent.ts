import {Component} from "angular2/core";
import {UserService} from "./../services/UserService";
import {Router} from "angular2/router";
import {Response} from 'angular2/http';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {View} from "angular2/core";
import {User} from "../models";

@Component({
    providers: [UserService, ROUTER_DIRECTIVES]
})

@View({
    templateUrl: './templates/login.html',
    styleUrls: ['./css/login.css']
})

export class LoginFormComponent {
    authentKO: boolean = false;

    userService : UserService;
    router: Router;

    login : string = '';
    password: string = '';
    user: User;

    submitted:boolean = false;

    constructor(userService : UserService, router: Router) {
        this.userService = userService;
        this.router = router;
    }
    onSubmit( ){
        this.submitted = true;
        console.log("Bilou");


        this.userService.initSession(this.login, this.password)
            .subscribe(
                response => this.loginSuccessful(response),
                err => this.loginFailure(),
                () => console.log('Login complete')
            );
        }


    loginSuccessful(resp: Response) {
        console.log(resp);
        localStorage.setItem('token', resp.text());
        this.userService.login(this.login).subscribe(
            response => this.loadUserDetails(response),
            err => this.loginFailure(),
            () => console.log('User details loaded')
        )
    }

    loadUserDetails(resp: Response) {
        this.user = resp.json();
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['Home']);
        localStorage.setItem('currentRound', 0 + "");
    }

    loginFailure() {
        this.authentKO = true;
    }
}