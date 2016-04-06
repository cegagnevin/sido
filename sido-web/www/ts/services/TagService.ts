/**
 * Created by mvincent on 05/01/2016.
 */
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Constants} from './../utils/Constants'
import {SecurityUtils} from './../utils/SecurityUtils'

@Injectable()
export class TagService {
    constructor(private http:Http) {
        this.http = http;
    }

    /** Load all questions tags. */
    getAll() {
        return this.http.get(Constants.SERVER_URL + Constants.TAGS_URL, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json());
    }

    /** Load all quizz tags. */
    getAllQuizzTags() {
        return this.http.get(Constants.SERVER_URL + Constants.QUIZZ_TAGS_URL, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json());
    }
}
