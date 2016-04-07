/**
 * Created by cChariereFiedler on 06/04/2016.
 */
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {Constants} from "../utils/Constants";
import {Poi} from "./../models";
import {BaseService} from "./BaseService";
import {Round} from "../models";
import {SecurityUtils} from "../utils/SecurityUtils";
import {CoordsGPS} from "../models";



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

    public getAllByRound(round: Round) {
        var result : Array<Poi>;
        return this.http.get(BaseService.getServerUrl() + this.getUrl()  + "/" +round.id + Constants.POI_URL, SecurityUtils.tokenBasedAuthentication())
            .map(res => {
                let r = res.json();
                console.log(r);
                return r;
            })
            .subscribe(res => {
                res.forEach(item => {
                    let poi : Poi = new Poi(item['poi'] || '',  item['type'] || '', new CoordsGPS(item['latitude'] || 0, item['longitude'] || 0));
                    console.log("Round Poi : " + poi);
                    result.push(poi);
                });
                return result;
            });
    }

}
