import {Component} from "angular2/core";
import {RoundService} from "../services/RoundService";
import {View} from "angular2/core";
import {Round} from "../models";
import {PoiService} from "../services/PoiService";
import {Poi} from "../models";
import {Attribute} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Facade} from "../Facade";

@Component({
    selector: 'round',
    providers: [RoundService, PoiService],
    properties: ['id']
})

@View({
    templateUrl: './templates/round.html',
    directives: [CORE_DIRECTIVES]
})
export class RoundComponent {
    id: string;
    round: Round = new Round();
    constructor(roundService : RoundService, poiService: PoiService, @Attribute('id') id:string){
        this.id = id;
        roundService.getById(this.id)
            .subscribe((res:Round) => {
                this.round = res;
                this.initMap();
                this.initPoI();
                this.initCustomers();
            });
    }

    initMap() {
        Facade.initItinerary(this.round.startAddress, this.round.finishAddress, this.round.poIs, this.round.customers);
    }

    initPoI() {
        this.round.poIs.forEach(function(poi) {
            console.log(poi.latitude + ' - '+ poi.longitude + ' - '+ poi.type);
            Facade.addMarkerWithType(+poi.latitude, +poi.longitude, '', poi.type);
        })
    }

    initCustomers() {
        this.round.customers.forEach(function(customer) {
            console.log(customer.latitude + ' - '+ customer.longitude + ' - '+ customer.name);
            Facade.addMarkerWithType(+customer.latitude, +customer.longitude, customer.name, 'customer');
        })
    }
}