//--------------------------------------------------------------------------------
// User information
export class User {

    constructor(public id: string, public login: string, public surname:string, public password:string, public forename:string, public rounds:Array<Round>) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.surname = surname;
        this.forename = forename;
        this.rounds = rounds;
    }
}


//--------------------------------------------------------------------------------

export class CoordsGPS {
    lat: number;
    lon: number;

    constructor( lat:number, lon:number) {
        this.lat = lat;
        this.lon = lon;
    }
}

export class Memo {
    id: string;
    title: string;
    description: string;
}

export class Address {
    postalCode: string;
    city: string;
    coords: CoordsGPS;
}

export class AccessCode {
    id: string;
    key: string;
    code: string;
}


export class Customer {
    id:string;
    name: string;
    accessCodes: Array<AccessCode>;
    address: string;
    openingHours: string;
    closingHours: string;
    latitude: number;
    longitude: number;
    memos: Array<Memo>;


    constructor(name:string='', accessCodes:Array<AccessCode>=null, address:string='', openingHours:string='', closingHours:string='', latitude:number=0, longitude:number=0, memos:Array<Memo>=null) {
        this.name = name;
        this.accessCodes = accessCodes;
        this.address = address;
        this.openingHours = openingHours;
        this.closingHours = closingHours;
        this.latitude = latitude;
        this.longitude = longitude;
        this.memos = memos;
    }
}

export class Poi {
    id: string;
    name: string;
    type: string;
    reference: string;
    latitude: number;
    longitude: number;
    address: string;
    openingHours: string;
    closingHours: string;


    constructor(type:string, name:string, reference:string, latitude:number, longitude:number, address: string, openingHours: string, closingHours: string) {
        this.type = type;
        this.name = name;
        this.reference = reference;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.openingHours = openingHours;
        this.closingHours = closingHours;
    }
}

export class Round {
    id: string;
    name: string;
    startAddress: string;
    finishAddress: string;
    poIs: Array<Poi>;
    customers: Array<Customer>;
}

export class Domain {
    id: string;
    name: string;
    users: Array<User>;
}