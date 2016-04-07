
import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {Response} from 'angular2/http';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {View} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";

import {Memo} from "../models";
import {RouteParams} from "angular2/router";
import {Customer} from "../models";
import {User} from "../models";
import {UserService} from "../services/UserService";


@Component({
    providers: [UserService, ROUTER_DIRECTIVES]
})

@View({
    templateUrl: './templates/newMemoForm.html',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class NewMemoFormComponent {
    error : String = "";
    success: String = "";
    userService : UserService;
    router : Router;

    memo : Memo = new Memo();
    customer : Customer = new Customer();
    user:User;

    constructor(userService: UserService, router: Router, params: RouteParams) {
        this.userService = userService;
        this.router = router;

        this.customer.id = params.get('id');


    }
    onSubmit( ){
        this.customer = JSON.parse(localStorage.getItem('customer'));
        this.user = <User>JSON.parse(localStorage.getItem('user'));
        for (var i = 0, len = this.user.rounds.length; i < len; i++) {
            var round = this.user.rounds[i];
            if (round) {
                for (var j = 0, len = round.customers.length; j < len; j++) {
                    var c = round.customers[j];
                    if (c.id == this.customer.id) {
                        c.memos.push(this.memo);
                        break;
                    }
                }
            }
        }

        this.userService.updateUser(this.user);
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['Home']);
    }
}
