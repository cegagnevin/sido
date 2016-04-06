import {Component} from "angular2/core";
import {UserService} from "./../services/UserService";
import {Router} from "angular2/router";
import {Response} from 'angular2/http';
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    templateUrl: './templates/_login.html',
    styleUrls: ['./css/login.css'],
    directives: [ ROUTER_DIRECTIVES],
    providers: [UserService]
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