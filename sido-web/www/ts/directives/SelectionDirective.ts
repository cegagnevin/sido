import {Directive, ElementRef, Inject} from 'angular2/core';
/**
 * Created by mvincent on 06/01/2016.
 */
@Directive({
    selector: '[selection-color]',
    properties: ['color:selection-color'],
    host: {
        '(click)': 'select($event)'
    }
})
export class SelectionDirective {
    color: string = "black";
    el: ElementRef;
    private _oldColor: string;

    constructor(@Inject(ElementRef) el: ElementRef) {
        this.el = el;
        this._oldColor = this.el.nativeElement.style.backgroundColor || 'black';
    }

    select(event) {
        if (this.el.nativeElement.style.backgroundColor == "black") {
            this.el.nativeElement.style.backgroundColor = "red";
        } else {
            this.el.nativeElement.style.backgroundColor = "black";
        }
    }
}