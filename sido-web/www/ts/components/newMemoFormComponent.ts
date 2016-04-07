
import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {Response} from 'angular2/http';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {View} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";

import {CustomerService} from '../services/CustomerService';
import {Memo} from "../models";
import {RouteParams} from "angular2/router";
import {Customer} from "../models";


@Component({
    providers: [CustomerService, ROUTER_DIRECTIVES]
})

@View({
    templateUrl: './templates/newMemoForm.html',
    directives: [FORM_DIRECTIVES]
})

export class NewMemoFormComponent {
    error : String = "";
    success: String = "";
    customerService : CustomerService;
    router : Router;

    memo : Memo = new Memo();
    customer : Customer = new Customer();

    constructor(customerService: CustomerService, router: Router, params: RouteParams) {
        this.customerService = customerService;
        this.router = router;

        this.customer.id = params.get('id');


    }
    onSubmit( ){
        this.error = "Submit";
        //TODO: Insert form handler + verification
        this.customerService.addMemo(this.customer, this.memo)
            .subscribe(
                success => {
                    this.success = "The memo has been added";

                }
                ,
                error => {
                    this.error = "An error occurred during the operation";
                }
            );
    }

}
