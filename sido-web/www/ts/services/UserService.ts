/**
 * Created by mvincent on 05/01/2016.
 */
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Constants} from './../utils/Constants'
import {SecurityUtils} from './../utils/SecurityUtils'
import {Question} from "./../models";

@Injectable()
export class UserService {

    constructor(private http:Http) {
        this.http = http;
    }

    /** Load all questions. */
    login(login: string) {
        return this.http.get(Constants.SERVER_URL + Constants.USER_URL + Constants.USER_INFO_URL + login, SecurityUtils.tokenBasedAuthentication());
    }

    initSession(login: string, pwd:string) {
        return this.http.post(Constants.SERVER_URL + Constants.SESSION_URL + Constants.CREATE_URL, login, SecurityUtils.authentication(login, pwd))
    }

    checkSession(token: string) {
        return this.http.post(Constants.SERVER_URL + Constants.SESSION_URL + Constants.CHECK_URL, token, SecurityUtils.tokenBasedAuthentication())
        .map(res => res.text);
    }
}