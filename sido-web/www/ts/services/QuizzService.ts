/**
 * Created by mvincent on 05/01/2016.
 */
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {BaseService} from './BaseService';
import {Constants} from './../utils/Constants';
import {SecurityUtils} from './../utils/SecurityUtils';
import {Quizz} from "../models";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'; // this is for Observable.of
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat-static';
import 'rxjs/add/observable/fromArray';
import {Response} from "angular2/http";
import {RequestOptionsArgs} from "angular2/http";

@Injectable()
export class QuizzService extends BaseService<Quizz> {
    constructor(http:Http) {
        super(http);
    }

    public getUrl():string {
        return Constants.QUIZZ_URL;
    }
    protected getId(entity:Quizz):string {
        return entity.id;
    }

    /** Loads all quizzes. */
    public getAll(pageSize:number = this.DEFAULT_PAGE_SIZE, pageIndex:number = this.DEFAULT_PAGE_INDEX) {
        return this.getPagedJson(Constants.SERVER_URL + Constants.QUIZZ_URL, pageSize, pageIndex);
    }

    /** Load filtered quizz according to given tags. */
    getQuizzFilteredBy(tags:Array<string>, nbPerPage:number, currentPage:number) {
        var params:string = Constants.TAG + tags[0];
        if (tags.length > 1) {
            for (var index = 1; index < tags.length; index++) {
                params += "&" + Constants.TAG + tags[index];
            }
        }

        return this.http.get(Constants.SERVER_URL + Constants.QUIZZ_WITH_TAG_URL + params + "&size=" + nbPerPage + "&page=" + currentPage, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json());
    }

    /** Loads a quizz identified by its id. */
    public getByIdWithQuestions(quizzId:string, onComplete?:(Quizz) => void):void {

        let questionsUrl = "";
        let quizz:Quizz = null;

        this.http.get(Constants.SERVER_URL + Constants.QUIZZ_URL + "/" + quizzId, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json())
            .subscribe((res:any) => {
                questionsUrl = res._links.questions.href;
                quizz = this.createQuizz(res);
            }, () => {
                console.log("Error while retrieving quizz with Id " + quizzId)
            }, () => {
                // Now retrieve the quizz's questions
                this.getJson(questionsUrl).map((qdata:any) => {
                    quizz.questions = qdata._embedded.question;
                }).subscribe(null, null, () => {
                    if (onComplete) {
                        onComplete(quizz);
                    }
                });
            });
    }

    /**
     * Loads all quizzes (for the specified page and page size) with their associated questions.
     * The onComplete callback passes the array of quizzes and the total number of quizzes.
     */
    public getAllWithQuestions(pageSize:number = this.DEFAULT_PAGE_SIZE,
                               pageIndex:number = this.DEFAULT_PAGE_INDEX,
                               onComplete?:((Array, number) => void)):void {

        let total = 0; // this will contain the total count of quizzes.

        let questionsObservables:Array<Observable<any>> = new Array();
        let quizzObservable = this
            .getAll(pageSize, pageIndex)
            .map((data:any) => {
                if (!data) {
                    return null;
                }

                total = data.page.totalElements;
                return data._embedded.quizz;
            })
            .map((data:Array<any>) => {
                if (!data) {
                    return [];
                }

                let result:Array<Quizz> = [];
                for (let item of data) {
                    let q = this.createQuizz(item);
                    result.push(q);

                    // We use this construct because (unless targeting ES6) 'let' variables can't be used in a lambda).
                    // Therefore, we build the closure by hand in a very javascript-ish way...
                    // See https://github.com/Microsoft/TypeScript/issues/1690
                    (function (self, currentItem, currentQuizz) {
                        let questionObservable = self
                            .getJson(currentItem._links.questions.href)
                            .map((qdata:any) => {
                                currentQuizz.questions = qdata._embedded.question;
                            });

                        questionsObservables.push(questionObservable);
                    })(this, item, q);
                }

                return result;
            });

        let quizzs:Array<Quizz> = [];
        quizzObservable.subscribe(result => {
                quizzs = result;
                console.log("Processed (quizzObservable): " + result);
            }, err => {
                console.log("ERROR (quizzObservable): " + err);
            }, () => {
                Observable.concat.apply(null, questionsObservables).subscribe(x => {
                    console.log("Processed (questionsObservables): " + x);
                }, err => {
                    console.log("ERROR (questionsObservables): " + err);
                }, () => {
                    if (onComplete) {
                        onComplete(quizzs, total);
                    }
                });
            }
        );
    }

    /** Updates an existing quizz. */
    public update(quizz:Quizz, onComplete?:() => void):void {
        let headers:Headers = SecurityUtils.tokenHeaders();
        headers.append('Content-Type', 'application/json');

        let jsonPayload = QuizzService.createQuizzToSave(quizz);
        this.http.patch(Constants.SERVER_URL + Constants.QUIZZ_URL + "/" + quizz.id, jsonPayload, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
                data => console.log('data = ' + data),
                err => console.log(err),
                () => {
                    console.log('Quizz updated');
                    if (onComplete) {
                        onComplete();
                    }
                }
            );
    }

    /** Saves new quizz. */
    public save(quizz:Quizz, onComplete?:() => void):void {
        let headers:Headers = SecurityUtils.tokenHeaders();
        headers.append('Content-Type', 'application/json');

        let jsonPayload = QuizzService.createQuizzToSave(quizz);
        this.http.post(Constants.SERVER_URL + Constants.QUIZZ_URL, jsonPayload, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
                data => console.log('data = ' + data),
                err => console.log(err),
                () => {
                    console.log('Quizz saved');
                    if (onComplete) {
                        onComplete();
                    }
                }
            );
    }

    /** Deletes the specified quizz. */
    public delete(quizz:Quizz, onComplete?:() => void):void {

        this.http.delete(Constants.SERVER_URL + Constants.QUIZZ_URL + "/" + quizz.id, SecurityUtils.tokenBasedAuthentication())
            .subscribe(
                data => {
                    console.log('data = ' + data);
                },
                err => {
                    console.log(err);
                },
                () => {
                    console.log('Quizz deleted');
                    if (onComplete) {
                        onComplete();
                    }
                });
    }

    public static createQuizzToSave(quizz:Quizz):string {

        class QuizzToSave {
            label:string;
            tags:Array<string>;
            questions:Array<string>; // This is what is different from the regular Quizz class
        }

        let toSave = new QuizzToSave();
        toSave.label = quizz.label;
        toSave.tags = quizz.tags;
        toSave.questions = [];
        for (let question of quizz.questions) {
            toSave.questions.push(
                Constants.SERVER_URL + Constants.QUESTION_URL + "/" + question.id);
        }

        return JSON.stringify(toSave);
    }

    // Creates a Quizz object from its Json representation
    private createQuizz(item:any):Quizz {
        let q = new Quizz();
        q.id = item.id;
        q.label = item.label;
        q.tags = item.tags;

        return q;
    }
}
