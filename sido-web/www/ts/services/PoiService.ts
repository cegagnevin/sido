/**
 * Created by cChariereFiedler on 06/04/2016.
 */
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {Constants} from "../utils/Constants";
import {Poi} from "./../models";
import {BaseService} from "./BaseService";



@Injectable()
export class PoiService extends BaseService<Poi> {
    constructor(http:Http) {
        super(http);
    }
    protected getUrl():string {
        return Constants.POI_URL;
    }

    protected getId(entity:Poi):string {
        return entity.id;
    }


}
