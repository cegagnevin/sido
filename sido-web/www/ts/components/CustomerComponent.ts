/**
 * Created by mvincent on 06/01/2016.
 */
import {Component, View} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, RouteParams, RouteConfig, Router} from "angular2/router";
import {CustomerService} from "../services/CustomerService";
import {Customer} from '../models';


@Component({
    properties: ['id'],
    providers: [ROUTER_DIRECTIVES, CustomerService, FORM_DIRECTIVES, CORE_DIRECTIVES]
})

@View({
    templateUrl: './templates/customer.html',
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class CustomerComponent {
    customer: Customer = new Customer();

    constructor(params: RouteParams, customerService: CustomerService) {
        console.log("Customer Component");

        customerService.getById(params.get('id'))
            .subscribe((response:Customer)=> {
                this.customer = response;
                console.log(this.customer);
            });

    }

}
