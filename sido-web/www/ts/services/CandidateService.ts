/**
 * Created by dcapelani on 11/01/2016.
 */
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {BaseService} from './BaseService';
import {Constants} from './../utils/Constants';
import {SecurityUtils} from './../utils/SecurityUtils';
import {Candidate, QuizzResult} from "../models";

@Injectable()
export class CandidateService extends BaseService {
    constructor(http:Http) {
        super(http);
    }

    /** Load all results. */
    getAll(nbPerPage : number = 100, pageNb : number = 0) {
        return this.http.get(Constants.SERVER_URL + Constants.CANDIDATE_URL +"?size="+nbPerPage+"&page="+pageNb, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json());
    }

    getByCandidateId(candidateId: string) {
        return this.http.get(Constants.SERVER_URL + Constants.CANDIDATE_URL + Constants.CANDIDATE_ID_URL + candidateId, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json());
    }

    getByFilteredCandidateId(filter: string, nbPerPage : number, pageNb : number) {
        return this.http.get(Constants.SERVER_URL + Constants.CANDIDATE_URL + Constants.CANDIDATE_ID_FILTER_URL + filter + "&size="+nbPerPage+"&page="+pageNb, SecurityUtils.tokenBasedAuthentication())
            .map(res => res.json());
    }

    /** Save new candidate. */
    save(candidate:Candidate) {
        var headers: Headers = SecurityUtils.tokenHeaders();
        headers.append('Content-Type', 'application/json');

        this.http.post(Constants.SERVER_URL + Constants.CANDIDATE_URL, CandidateService.formatCandidate(candidate), {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
                data => this.saveIsOk(data),
                err => this.saveIsNotOk(err),
                () => console.log('Post complete')
            );
        console.log('Candidate saved');
    }

    update(candidate: Candidate): Promise<boolean>
    {
        var myThis = this;
        return new Promise(function(resolve, reject){
            var headers: Headers = SecurityUtils.tokenHeaders();
            headers.append('Content-Type', 'application/json');

            myThis.http.patch(Constants.SERVER_URL + Constants.CANDIDATE_URL+'/'+candidate.id,  CandidateService.formatCandidate(candidate), {
                    headers: headers
                })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log('data = ' + data);
                        resolve(true);
                    },
                    err => {
                        console.log(err);
                        reject(false);
                    },
                    () => console.log('Patch complete')
                );
        });
    }

    private static formatCandidate(candidate: Candidate):string {

        class QuizzToSave {
            id: string;
            label:string;
            tags:Array<string>;
            questions:Array<string>; // This is what is different from the regular Quizz class
        }

        class ResultToSave {
            id: string;
            label:string;
            quizzResult:number;
            questions:Array<string>; // This is what is different from the regular Quizz class
        }

        class CandidateToSave {
            candidateId: string;
            globalResult: number;
            quizzs: Array<QuizzToSave> = [];
            results: Array<ResultToSave> = [];
        }

        let cts = new CandidateToSave();
        cts.candidateId = candidate.candidateId;
        cts.globalResult = candidate.globalResult;
        if(candidate.quizzs != null)
        {
            for (let quizz of candidate.quizzs) {
                let toSave = new QuizzToSave();
                toSave.id = quizz.id;
                toSave.label = quizz.label;
                toSave.tags = quizz.tags;
                toSave.questions = [];
                if(quizz.questions != null)
                {
                    for (let question of quizz.questions) {
                        toSave.questions.push(
                            Constants.SERVER_URL + Constants.QUESTION_URL + "/" + question.id);
                    }
                }
                cts.quizzs.push(toSave);
            }
        }
        if(candidate.results != null)
        {
            for (let res of candidate.results) {
                let resToSave = new ResultToSave();
                resToSave.id = res.id;
                resToSave.label = res.label;
                resToSave.quizzResult = res.quizzResult;
                resToSave.questions = [];
                for (let resQuest of res.results) {
                    resToSave.questions.push(
                        Constants.SERVER_URL + Constants.QUESTION_RESULT_URL + "/" + resQuest.id);
                }
                cts.results.push(resToSave);
            }
        }
        return JSON.stringify(cts);
    }

    saveIsOk (data) {
        console.log('data = ' + data);
        alert("Le candidat a bien été enregistré");
    }

    saveIsNotOk (err)
    {
        console.log(err);
        alert("Le candidat n'a pas été enregistré");
    }
}