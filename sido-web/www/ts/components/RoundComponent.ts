import {Component} from "angular2/core";
import {RoundService} from "../services/RoundService";
import {View} from "angular2/core";
import {Round} from "../models";
import {PoiService} from "../services/PoiService";
import {Poi} from "../models";
import {Attribute} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Facade} from "../Facade";
import {
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    RouteConfig,
    Location
} from 'angular2/router';
import {Router} from "angular2/router";
import {Customer} from "../models";
import {User} from "../models";


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
    restaurants: Array<Poi>;
    areas: Array<Poi>;

    router: Router;

    filter: String="customer";

    constructor(router: Router, roundService : RoundService, poiService: PoiService, @Attribute('id') id:string){
        this.id = id;
        this.router = router;

        var user = <User>JSON.parse(localStorage.getItem('user'));
        this.round = user.rounds[0];

        this.areas = this.round.poIs.filter(element => element.type == 'area');
        this.restaurants = this.round.poIs.filter(element => element.type == 'restaurant');

        //Todo: Use internal service
        localStorage.setItem('restaurants', JSON.stringify(this.restaurants));


        this.initMap();
        this.initPoI();
        this.initCustomers();
    }

    initMap() {
        Facade.initItinerary(this.round.startAddress, this.round.finishAddress, this.round.poIs, this.round.customers);
    }

    initPoI() {
        if(this.round.poIs != null) {
            this.round.poIs.forEach(function (poi) {
                Facade.addMarkerWithType(+poi.latitude, +poi.longitude, poi.name, poi.type);
            })
        }
    }

    initCustomers() {
        if(this.round.customers != null) {
            this.round.customers.forEach(function (customer) {
                Facade.addMarkerWithType(+customer.latitude, +customer.longitude, customer.name, 'customer');
            })
        }
    }

    goToCustomer(element: Customer) {
        if(element.id !== undefined) {
            localStorage.setItem('customer', JSON.stringify(element))
            this.router.navigate(['Customer', {'id' : element.id}]);
        }
    }
}