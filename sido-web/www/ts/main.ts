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

declare function initItinerary(origin, destination): void;
declare function addMarker(latitude, longitude, title): void;
declare function getGPSCoordinates(cbSuccess, cbError): void;

@Component({
    selector: 'my-app',
    providers: [UserService]
})
@View({
    templateUrl: './templates/home.html',
    styleUrls: ['./css/quizz.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES, LoginFormComponent]
})
export class AppComponent {

    public connected: boolean = false;
    public currentMenu: string = null;

    public login: string = "default";
    public password: string = "";

    public latitude:number;
    public longitude:number;

    constructor() {
        console.log('Home loaded');
        initItinerary('Paris', 'Clermont-Ferrand');
        addMarker(47.902964, 1.9092510000000402, 'test jkh jkdsf sdkjfhsd fkjhds fkdhs fsdk');
        addMarker(45.7851608, 4.8567564999999995, 'On est ici !');

        getGPSCoordinates((function(coords) {
            this.latitude = coords.latitude;
            this.longitude = coords.longitude;
        }).bind(this), function(error) {
            console.log(error.code + ' - ' + error.message)
        });
    }
}
