/**
 * Created by cChariereFiedler on 05/01/2016.
 */
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {Constants} from "../utils/Constants";
import {Customer} from "./../models";
import {BaseService} from "./BaseService";



@Injectable()
export class CustomerService extends BaseService<Customer> {
    constructor(http:Http) {
        super(http);
    }
    protected getUrl():string {
        return Constants.CUSTOMER_URL;
    }

    protected getId(entity:Customer):string {
        return entity.id;
    }


}
