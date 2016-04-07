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
import {RouteParams} from "angular2/router";
import {Inject} from "angular2/core";
import {Input} from "angular2/core";


@Component({
    selector: 'round',
    providers: [RoundService, PoiService]
})

@View({
    templateUrl: './templates/round.html',
    directives: [CORE_DIRECTIVES]
})
export class RoundComponent {
    id: string;
    round: Round = new Round();
    @Input() roundName;
    restaurants: Array<Poi>;
    areas: Array<Poi>;

    router: Router;

    filter: String="customer";

    constructor(params: RouteParams,router: Router, roundService : RoundService, poiService: PoiService){
        this.id = params.get('id') || null;
        this.router = router;

        var user = <User>JSON.parse(localStorage.getItem('user'));

        if(this.id === null) {
            this.round = user.rounds[0];
        } else {
            this.round = user.rounds.find(element=> element['id'] == this.id);
        }

        localStorage.setItem('currentRound', JSON.stringify(this.round));
        this.roundName = this.round.name;

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
                Facade.addMarkerWithType(+poi.latitude, +poi.longitude, poi.name, poi.type, poi.address, poi.openingHours, poi.closingHours);
            })
        }
    }

    initCustomers() {
        if(this.round.customers != null) {
            this.round.customers.forEach(function (customer) {
                Facade.addMarkerWithType(+customer.latitude, +customer.longitude, customer.name, 'customer', customer.address, customer.openingHours, customer.closingHours);
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