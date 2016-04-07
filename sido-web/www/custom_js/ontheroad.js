/**
 * Created by alexis on 06/04/2016.
 */

var map;

function initCenterMap(latitude, longitude) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: latitude, lng: longitude},
        zoom: 9
    });
}

function initItinerary(origin, destination, poIs, customers) {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var waypts = [];

    var steps = poIs.concat(customers).sort(function(step1, step2) {
        return step1.order - step2.order;
    });

    steps.forEach(function (step) {
        waypts.push({
            location: {lat: +step.latitude, lng: +step.longitude},
            stopover: false
        });
    });

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7
    });
    directionsDisplay.setMap(map);

    directionsService.route({
        origin: origin,
        destination: destination,
        waypoints: waypts,
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function addMarker(latitude, longitude, description, address, openingHours, closingHours) {
    addMarkerWithType(latitude, longitude, description, "customer", address, openingHours, closingHours);
}

function addMarkerWithType(latitude, longitude, description, type, address, openingHours, closingHours) {
    var icon = './img/';

    switch(type) {
        case "restaurant":
            icon += 'restaurant.png';
            break;
        case "area":
            icon += 'sleep.png';
            break;
        case "customer":
            icon += 'truck-info.png';
            break;
    }
    console.log(address + openingHours);

    var infowindow = new google.maps.InfoWindow({
        content: '<div class="marker-info"><strong class="marker-info-name">'+description+'</strong><p class="marker-info-address">'+address+'</p class="marker-info-hours"><p>Horaires : '+openingHours+' - '+closingHours+'</p></div>'
    });

    var marker = new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        map: map,
        title: '',
        icon: icon
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

function geocodeAddress(address) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            return results[0].geometry.location;
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function getGPSCoordinates(cbSuccess, cbError) {
    return navigator.geolocation.getCurrentPosition((position) => {
            if(cbSuccess !== undefined)
                cbSuccess(position.coords);
    }, (error) => {
        if(cbError !== undefined)
            cbError(error);
    });
}

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);

    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}