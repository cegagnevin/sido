declare function initItinerary(origin, destination, poIs, customers): void;
declare function addMarker(latitude, longitude, title): void;
declare function addMarkerWithType(latitude, longitude, title, type): void;
declare function getGPSCoordinates(cbSuccess, cbError): void;

export class Facade {

    static initItinerary(origin, destination, poIs, customers) {
        initItinerary(origin, destination, poIs, customers);
    }

    static addMarker(latitude, longitude, title) {
        addMarker(latitude, longitude, title);
    }

    static addMarkerWithType(latitude, longitude, title, type) {
        addMarkerWithType(latitude, longitude, title, type);
    }

    static getGPSCoordinates(cbSuccess, cbError) {
        getGPSCoordinates(cbSuccess, cbError);
    }
}