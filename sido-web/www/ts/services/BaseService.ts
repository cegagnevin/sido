/**
 * Created by odalet on 08/01/2016.
 */

import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {SecurityUtils} from './../utils/SecurityUtils'

@Injectable()
export class BaseService {

    protected http:Http;

    protected get DEFAULT_PAGE_SIZE():number {
        return 20;
    }

    protected get DEFAULT_PAGE_INDEX():number {
        return 0;
    }

    constructor(http:Http) {
        this.http = http;
    }

    protected getJson(url:string) {
        return this.http.get(url, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json());
    }

    public getPagedJson(baseUrl:string, pageSize:number = this.DEFAULT_PAGE_SIZE, pageIndex:number = this.DEFAULT_PAGE_INDEX) {
        return this.getJson(baseUrl + "?size=" + pageSize + "&page=" + pageIndex);
    }
}