export interface cdbEvent {
        id:string;
        key:string;
        doc : {
        _id: string;
        _rev: string;
        id: string;
        title: string;
        description: string;
        timestamp: Date;
        location : {
                lat: number;
                lng: number
        }
        }
}