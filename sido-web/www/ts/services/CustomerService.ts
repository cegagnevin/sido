/**
 * Created by cChariereFiedler on 05/01/2016.
 */
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {Constants} from "../utils/Constants";
import {Customer} from "./../models";
import {BaseService} from "./BaseService";
import {Memo} from "../models";



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

    public addMemo(customer:Customer, memo: Memo) {
        return this.http.post(BaseService.getServerUrl() + this.getUrl() + '/' + customer.id + Constants.MEMO_URL, JSON.stringify(memo), {
                headers: this.getSecurityHeaders()
            })
            .map(res => res.json());
    }

}
