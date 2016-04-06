/**
 * Created by mvincent on 05/01/2016.
 */
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Constants} from './../utils/Constants'
import {SecurityUtils} from './../utils/SecurityUtils'
import {Question} from "./../models";
import {BaseService} from "./BaseService";

@Injectable()
export class QuestionService extends BaseService<Question> {
    constructor(http:Http) {
        super(http);
    }

    public getUrl():string {
        return Constants.QUESTION_URL;
    }

    protected getId(entity:Question):string {
        return entity.id;
    }

    /** Prefer this one to getAll */
    public getAllQuestions(pageSize:number = this.DEFAULT_PAGE_SIZE,
                           pageIndex:number = this.DEFAULT_PAGE_INDEX,
                           onComplete?:((Array, number) => void)) {

        let result:Array<Question> = [];
        let total = 0; // this will contain the total count of questions.

        this.getPagedJson(Constants.SERVER_URL + Constants.QUESTION_URL, pageSize, pageIndex)
            .map((data:any) => {
                if (!data) {
                    return null;
                }

                total = data.page.totalElements;
                return data._embedded.question;
            })
            .subscribe(
                (data:Array<any>) => {
                    if (data) {
                        result = data;
                    }
                },
                () => {
                    console.log("Could not retrieve questions");
                },
                () => {
                    if (onComplete) {
                        onComplete(result, total);
                    }
                });
    }

    /** Load all questions. */
    getAll(nbPerPage:number, currentPage:number) {
        return this.http.get(Constants.SERVER_URL + Constants.QUESTION_URL + "?size=" + nbPerPage + "&page=" + currentPage, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json());
    }

    /** Load a specific question with its id */
    getById(id : string)
    {
        return this.http.get(Constants.SERVER_URL + Constants.QUESTION_URL + "/" +id, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json());
    }

    /** Load filtered questions according to given tags. */
    getQuestionsFilteredBy(tags:Array < string >, nbPerPage:number, currentPage:number) {
        var params:string = Constants.TAG + encodeURIComponent(tags[0]);
        if (tags.length > 1) {
            for (var index = 1; index < tags.length; index++) {
                params += "&" + Constants.TAG + encodeURIComponent(tags[index]);
            }
        }

        return this.http.get(Constants.SERVER_URL + Constants.QUESTION_WITH_TAG_URL + params + "&size=" + nbPerPage + "&page=" + currentPage, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json());
    }

    save(question:Question, onComplete?:() => void) {
        var headers:Headers = SecurityUtils.tokenHeaders();
        headers.append('Content-Type', 'application/json');

        this.http.post(Constants.SERVER_URL + Constants.QUESTION_URL, JSON.stringify(question), {
                headers: headers
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
        console.log('Question saved');
    }

    /**update a question*/
    update(question:Question, onComplete?:() => void) {
        var headers:Headers = SecurityUtils.tokenHeaders();
        headers.append('Content-Type', 'application/json');

        this.http.patch(Constants.SERVER_URL + Constants.QUESTION_URL+"/"+question.id, JSON.stringify(question), {
                headers: headers
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
}
