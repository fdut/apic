import { Location } from "./location";

export class Event{
    constructor(public title: string,
                public description: string,
                public timestamp: Date,
                public location: Location){}
}

