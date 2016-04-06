/**
 * Created by mvincent on 06/01/2016.
 */
import {Component, View} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {Answer} from "../models";

@Component({
    selector: 'answer',
    properties: ['answer']
})
@View({
    template: `<div class="clearfix">
                <span class="pull-left col-md-11 col-sm-11 col-xs-11"><input name="{{answer.label}}" id="{{answer.label}}" [(ngModel)]="answer.label" data-clear-btn="true" type="text" placeholder="Réponse" class="form-control" style="margin-bottom: 5px" /></span>
                <span class="pull-right col-md-1 col-sm-1 col-xs-1"><img src="./img/correct.png" *ngIf="answer.correct" (click)="switch()" class="small-icon"></span>
                <span class="pull-right col-md-1 col-sm-1 col-xs-1"><img src="./img/incorrect.png" *ngIf="!answer.correct" (click)="switch()" class="small-icon"></span>
                </div>`,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class AnswerComponent {
    answer : Answer

    switch() {
        this.answer.correct = !this.answer.correct;
    }
}
