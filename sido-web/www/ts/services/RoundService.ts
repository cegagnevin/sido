/**
 * Created by cChariereFiedler on 06/04/2016.
 */
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {Constants} from "../utils/Constants";
import {Round} from "./../models";
import {BaseService} from "./BaseService";
import {User} from "../models";



@Injectable()
export class RoundService extends BaseService<Round> {
    constructor(http:Http) {
        super(http);
    }
    protected getUrl():string {
        return Constants.ROUND_URL;
    }

    protected getId(entity:Round):string {
        return entity.id;
    }

}
