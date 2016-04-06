/**
 * Created by mvincent on 06/01/2016.
 */
import {Component, View} from 'angular2/core';
import {SelectionDirective} from '../directives/SelectionDirective';

@Component({
    selector: 'tag',
    properties: ['name']
})
@View({
    template: '<span class="badge" name="filterTag" style="margin: 2px; background: black; cursor: pointer; cursor: hand;" [selection-color]="color">{{name}}</span>',
    directives: [SelectionDirective]
})
export class TagComponent {
    color: string = "black";
}
