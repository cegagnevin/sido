import {Component} from "angular2/core";
import {RoundService} from "../services/RoundService";
import {View} from "angular2/core";
import {Round} from "../models";
import {PoiService} from "../services/PoiService";
import {Poi} from "../models";
import {Attribute} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    RouteConfig,
    Location
} from 'angular2/router';
import {Router} from "angular2/router";
import {Customer} from "../models";


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

    router: Router;

    constructor(router: Router, roundService : RoundService, poiService: PoiService, @Attribute('id') id:string){
        this.id = id;
        this.router = router;
        roundService.getById(this.id)
            .subscribe((res:Round) => {
                this.round = res;
            });
    }

    goToCustomer(element: Customer) {
        if(element.id !== undefined) {
            this.router.navigate(['Customer', {'id' : element.id}]);
        }
    }
}