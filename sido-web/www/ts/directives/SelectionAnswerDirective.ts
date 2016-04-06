/**
 * Created by jaucagne on 20/01/2016.
 */
/**
 * used to color the background of the answer selected
 */
import {Directive, ElementRef, Inject} from 'angular2/core';
import {Constants} from '../utils/Constants';

@Directive({
    selector: '[selection-color]',
    properties: ['color:selection-color'],
    host: {
        '(click)': 'select($event)'
    }
})
export class SelectionAnswerDirective {
    color: string = Constants.unselectAnswerColor;
    el: ElementRef;
    private _oldColor: string;

    constructor(@Inject(ElementRef) el: ElementRef) {
        this.el = el;
        this._oldColor = this.el.nativeElement.style.backgroundColor || '';
    }

    select(event) {
        if (this.el.nativeElement.style.backgroundColor == Constants.unselectAnswerColor) {
            this.el.nativeElement.style.backgroundColor = Constants.selectAnswerColor;
        } else {
            this.el.nativeElement.style.backgroundColor = Constants.unselectAnswerColor;
        }
    }
}