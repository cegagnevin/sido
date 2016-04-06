/**
 * Created by mvincent on 05/01/2016.
 */
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Constants} from './../utils/Constants';
import {SecurityUtils} from './../utils/SecurityUtils';
import {QuizzResult, QuestionResult} from "../models";
import {BaseService} from "./BaseService";



@Injectable()
export class ResultService extends BaseService{
    constructor(public http:Http) {
        super(http);
    }

    /** Load all results. */
    getAll() {
        return this.http.get(Constants.SERVER_URL + Constants.QUIZZ_RESULT_URL, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json());
    }

    getById(quizzId: string) {
        return this.http.get(Constants.SERVER_URL + Constants.QUIZZ_RESULT_URL + Constants.QUIZZ_RESULT_ID_URL + quizzId, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json());
    }

    /**
     * save a QuizzResult and return the element in order to get the generated id
     * @param res
     * @returns {Promise<T>}
     */
    add( res: QuizzResult): Promise<QuizzResult> {
        var myThis = this;
        return new Promise(function(resolve, reject){
            var headers: Headers = SecurityUtils.tokenHeaders();
            headers.append('Content-Type', 'application/json');
            myThis.http.post(Constants.SERVER_URL + Constants.QUIZZ_RESULT_URL, JSON.stringify(res), {
                    headers: headers
                })
                .map(res => res.json())
                .subscribe(
                    data => {
                        resolve(data) },
                    err => reject('No id'),
                    () => console.log('Post complete')
                );
            console.log('resultat saved');
        });
    }

    /**
     * save a QuestionResult and return the element in order to get the generated id
     * @param quesRes
     * @returns {Promise<T>}
     */
    addQuestionResults( quesRes: Array <QuestionResult>): Promise<Array<QuestionResult>> {
        var myThis = this;
        return new Promise(function(resolve, reject){
            var headers: Headers = SecurityUtils.tokenHeaders();
            headers.append('Content-Type', 'application/json');

            var ok = true;
            var questionResults = new Array <QuestionResult> ();
            for(let quesR of quesRes)
            {
                myThis.http.post(Constants.SERVER_URL + Constants.QUESTION_RESULT_URL, JSON.stringify(quesR), {
                        headers: headers
                    })
                    .map(res => res.json())
                    .subscribe(
                        data => { questionResults.push(data);
                            if(questionResults.length == quesRes.length)
                            {
                                resolve(questionResults);
                            }},
                        err => {reject('No id'), ok = false},
                        () => console.log('Post complete')
                    );
                console.log('quest res saved');
            }
        });
    }

    public updateQuestionResults(quesRes: QuestionResult): Promise<QuestionResult>
    {
        var myThis = this;
        return new Promise(function(resolve, reject){
            var headers: Headers = SecurityUtils.tokenHeaders();
            headers.append('Content-Type', 'application/json');

            myThis.http.patch(Constants.SERVER_URL + Constants.QUESTION_RESULT_URL+'/'+quesRes.id, JSON.stringify(quesRes), {
                        headers: headers
                    })
                    .map(res => res.json())
                    .subscribe(
                        data => {
                                resolve(data);
                            },
                        err => {reject(null)},
                        () => console.log('Post complete')
                    );
                console.log('quest res saved');
            });
    }

    public updateQuizzResult(quizzRes: QuizzResult)
    {
        var headers: Headers = SecurityUtils.tokenHeaders();
        headers.append('Content-Type', 'application/json');

        this.http.patch(Constants.SERVER_URL + Constants.QUIZZ_RESULT_URL + '/' + quizzRes.id, JSON.stringify(quizzRes), {headers: headers})
        .map(res => res.json())
        .subscribe(
            data => console.log("quizz result updated"),
            err => {
                console.log("quizz result not updated");
                console.log(err);
            }
        )
    }
}
