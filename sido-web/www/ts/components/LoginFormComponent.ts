import {Component} from "angular2/core";
import {UserService} from "./../services/UserService";
import {Router} from "angular2/router";
import {Response} from 'angular2/http';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {View} from "angular2/core";

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
        this.router.navigate(['Home']);
    }

    loadUserDetails(resp: Response) {
        var data = resp.json();
    }

    loginFailure() {
        this.authentKO = true;
    }
}