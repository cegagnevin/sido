/** Copy from https://raw.githubusercontent.com/previousdeveloper/angular2-simple-countdown/master/lib/countdown.ts .*/
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Component, provide, ElementRef, Injector, IterableDiffers, KeyValueDiffers, Renderer} from 'angular2/core';

@Component({
    selector: 'count-down',
    properties: [
        'units',
        'end'
    ],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    template: `<h6><i *ngIf="!expired">Votre session expire dans {{displayString()}}</i><i *ngIf="expired" style="color: darkred">Session expired</i></h6>`

})
export class SessionCountdown {
    units:any;
    end:number;
    expired:boolean = false;
    public lastModalResult: string;

    constructor(private elementRef: ElementRef, private injector: Injector) {}

    onInit() {
        setInterval(()=>this.displayString(), 1);
        //this.openDialog();
    }

    displayString() {

        if (typeof this.units === 'string') {
            this.units = this.units.split('|');
        }

        var dateDifference:number = this.end - new Date().getTime();
        if (dateDifference < 0) { this.expired = true}

        var lastUnit = this.units[this.units.length - 1],
            unitConstantForMillisecs = {
                weeks: (1000 * 60 * 60 * 24 * 7),
                days: (1000 * 60 * 60 * 24),
                hours: (1000 * 60 * 60),
                minutes: (1000 * 60),
                seconds: 1000,
                milliseconds: 1
            },
            unitsLeft = {},
            returnString = '',
            totalMillisecsLeft = dateDifference,
            i,
            unit:any;
        for (i in this.units) {
            if (this.units.hasOwnProperty(i)) {

                unit = this.units[i].trim();
                if (unitConstantForMillisecs[unit.toLowerCase()] === false) {
                    //$interval.cancel(countDownInterval);
                    throw new Error('Cannot repeat unit: ' + unit);

                }
                if (unitConstantForMillisecs.hasOwnProperty(unit.toLowerCase()) === false) {
                    throw new Error('Unit: ' + unit + ' is not supported. Please use following units: weeks, days, hours, minutes, seconds, milliseconds');
                }

                unitsLeft[unit] = totalMillisecsLeft / unitConstantForMillisecs[unit.toLowerCase()];

                if (lastUnit === unit) {
                    unitsLeft[unit] = Math.ceil(unitsLeft[unit]);
                } else {
                    unitsLeft[unit] = Math.floor(unitsLeft[unit]);
                }
                totalMillisecsLeft -= unitsLeft[unit] * unitConstantForMillisecs[unit.toLowerCase()];
                unitConstantForMillisecs[unit.toLowerCase()] = false;


                returnString += ' ' + unitsLeft[unit] + ' ' + unit;
            }
        }
        return returnString;
    }
}