declare function initItinerary(origin, destination, poIs, customers): void;
declare function initCenterMap(latitude, longitude): void;
declare function addMarker(latitude, longitude, title, address, openingHours, closingHours): void;
declare function addMarkerWithType(latitude, longitude, title, type, address, openingHours, closingHours): void;
declare function getGPSCoordinates(cbSuccess, cbError): void;

export class Facade {

    static initItinerary(origin, destination, poIs, customers) {
        initItinerary(origin, destination, poIs, customers);
    }

    static addMarker(latitude, longitude, title, address, openingHours, closingHours) {
        addMarker(latitude, longitude, title, address, openingHours, closingHours);
    }

    static addMarkerWithType(latitude, longitude, title, type, address, openingHours, closingHours) {
        addMarkerWithType(latitude, longitude, title, type, address, openingHours, closingHours);
    }

    static getGPSCoordinates(cbSuccess, cbError) {
        getGPSCoordinates(cbSuccess, cbError);
    }

    static initCenterMap(latitude, longitude) {
        initCenterMap(latitude, longitude);
    }
}