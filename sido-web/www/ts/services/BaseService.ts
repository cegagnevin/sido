/**
 * Created by odalet on 08/01/2016.
 */

import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {SecurityUtils} from './../utils/SecurityUtils'
import {Constants} from "../utils/Constants";
import {Observable} from "rxjs/Observable";
import {Response} from "angular2/http";

@Injectable()
export abstract class BaseService<T> {

    protected http:Http;

    protected get DEFAULT_PAGE_SIZE():number {
        return 20;
    }

    protected get DEFAULT_PAGE_INDEX():number {
        return 0;
    }

    protected abstract getId(entity:T):string;

    constructor(http:Http) {
        this.http = http;
    }

    protected getJson(url:string) {
        return this.http.get(url, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json());
    }

    static getServerUrl():string {
        return Constants.SERVER_URL;
    }

    protected abstract getUrl():string;

    /** Load All Entities. */
    public getAll(nbPerPage:number, currentPage:number) {
        return this.http.get(BaseService.getServerUrl() + this.getUrl() + "?size=" + nbPerPage + "&page=" + currentPage, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json());
    }

    /** Load a specific question with its id */
    public getById(id : string)
    {
        return this.http.get(BaseService.getServerUrl() + this.getUrl()  + "/" +id, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json());
    }

    protected getSecurityHeaders():Headers {
        var headers:Headers = SecurityUtils.tokenHeaders();
        headers.append('Content-Type', 'application/json');

        return headers;
    }

    public save(entity:T, onComplete?:() => void) {

        this.http.post(BaseService.getServerUrl() + this.getUrl(), JSON.stringify(entity), {
                headers: this.getSecurityHeaders()
            })
            .map(res => res.json())
            .subscribe(
                data => console.log('data = ' + data),
                err => console.log(err),
                () => {
                    console.log('Post complete');
                    if (onComplete) {
                        onComplete();
                    };
                }
            );
        console.log('Entity Saved');
    }


    /**update a question*/
    public update(entity:T, onComplete?:() => void) {
        var headers:Headers = SecurityUtils.tokenHeaders();
        headers.append('Content-Type', 'application/json');

        this.http.patch(BaseService.getServerUrl() + this.getUrl()+"/"+this.getId(entity), JSON.stringify(entity), {
                headers: this.getSecurityHeaders()
            })
            .map(res => res.json())
            .subscribe(
                data => console.log('data = ' + data),
                err => console.log(err),
                () => {
                    console.log('Patch complete');
                    if (onComplete) {
                        onComplete();
                    };
                }
            );
        console.log('Question saved');
    }

    public getPagedJson(baseUrl:string, pageSize:number = this.DEFAULT_PAGE_SIZE, pageIndex:number = this.DEFAULT_PAGE_INDEX) {
        return this.getJson(baseUrl + "?size=" + pageSize + "&page=" + pageIndex);
    }
}