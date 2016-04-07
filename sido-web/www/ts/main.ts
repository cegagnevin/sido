/**
 * Created by mvincent on 24/10/2015.
 */
import {Component, Input, View, ApplicationRef} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {OnInit} from "angular2/core";

import {UserService} from "./services/UserService";
import {LoginFormComponent} from './components/LoginFormComponent';
import {RoundComponent} from './components/RoundComponent';
import {Facade} from "./Facade";

@Component({
    providers: [UserService]
})
@View({
    templateUrl: './templates/home.html',
    styleUrls: ['./css/quizz.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES, RoundComponent]
})
export class AppComponent {

    public latitude:number;
    public longitude:number;

    constructor() {
        console.log('Home loaded');
        Facade.initItinerary('Paris', 'Clermont-Ferrand');
        Facade.addMarker(47.902964, 1.9092510000000402, 'test jkh jkdsf sdkjfhsd fkjhds fkdhs fsdk');
        Facade.addMarker(45.7851608, 4.8567564999999995, 'On est ici !');

        Facade.getGPSCoordinates((function(coords) {
            this.latitude = coords.latitude;
            this.longitude = coords.longitude;
        }).bind(this), function(error) {
            console.log(error.code + ' - ' + error.message)
        });
    }
}
