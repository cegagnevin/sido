/**
 * Created by mvincent on 06/01/2016.
 */
import {Component, View} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, RouteParams, RouteConfig, Router} from "angular2/router";
import {CustomerService} from "../services/CustomerService";
import {Customer} from '../models';
import {User} from "../models";
import {Facade} from "../Facade";


@Component({
    properties: ['id'],
    providers: [ROUTER_DIRECTIVES, CustomerService, FORM_DIRECTIVES, CORE_DIRECTIVES]
})

@View({
    templateUrl: './templates/customer.html',
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class CustomerComponent {
    customer: Customer = new Customer();
    user:User;

    constructor(params: RouteParams, customerService: CustomerService) {

        this.customer = <Customer>JSON.parse(localStorage.getItem('customer'));
        this.user = <User>JSON.parse(localStorage.getItem('user'));

        console.log("Customer Component" + this.customer);

        Facade.initCenterMap(+this.customer.latitude, +this.customer.longitude);
        Facade.addMarkerWithType(+this.customer.latitude, +this.customer.longitude, '', 'customer', '', '', '');
    }

}
