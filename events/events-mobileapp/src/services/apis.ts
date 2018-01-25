import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import { Event } from "../models/event";
import { AuthService } from './auth';


@Injectable()
export class ApisService {

    constructor(private http: Http, private authService: AuthService) {}

    getTest(token: string){
        return this.http.get('http://jsonplaceholder.typicode.com/users')
        .map(res => res.json());
    }

    getEvents(){
        
        var headers = new Headers();
            headers.append('Authorization', 'Bearer ' + this.authService.getToken());
            headers.append('accept', 'application/json' );
            headers.append('x-ibm-client-id', this.authService.getClientID());
            headers.append('x-ibm-client-secret', this.authService.getClientSecret());

            //console.log(this.authService.getToken() + " : " + this.authService.getClientID() + " : " + this.authService.getClientSecret());
   
            return this.http.get(this.authService.getapicEndpoint() + '/v1/events', { headers: headers })
                .map(res => res.json());
    }

    postEvent(data: Event){

        var headers = new Headers();
            headers.append('Authorization', 'Bearer ' + this.authService.getToken());
            headers.append('x-ibm-client-id', this.authService.getClientID());
            headers.append('x-ibm-client-secret', this.authService.getClientSecret());
            headers.append('Accept', 'application/json' );
            headers.append('Content-Type', 'application/json' );
   
            return this.http.post(this.authService.getapicEndpoint()+ '/v1/events', data, { headers: headers })
                .map(res => res.json());
    }


    putEvent(documentid: string, documentrev: string,data: Event){
        
                var headers = new Headers();
                    headers.append('Authorization', 'Bearer ' + this.authService.getToken());
                    headers.append('x-ibm-client-id', this.authService.getClientID());
                    headers.append('x-ibm-client-secret', this.authService.getClientSecret());
                    headers.append('Accept', 'application/json' );
                    headers.append('Content-Type', 'application/json' );
           
                    return this.http.put(this.authService.getapicEndpoint()+ '/v1/events'+ '?id='+ documentid + "&rev=" + documentrev, data, { headers: headers })
                        .map(res => res.json());
            }
        

    deleteEvent(documentid: string, documentrev: string ){

        // documentid = {id: "972d9b5d85bac0bc34e5b00f7d72f3b9", rev: "1-db1634fa5c6849db31540c25a1debfea"}
        
                let headers = new Headers();
                    headers.append('Authorization', 'Bearer ' + this.authService.getToken());
                    headers.append('x-ibm-client-id', this.authService.getClientID());
                    headers.append('x-ibm-client-secret', this.authService.getClientSecret());
                    headers.append('Accept', 'application/json' );
                    headers.append('Content-Type', 'application/json' );
           
                let options = new RequestOptions({ headers: headers });

                    return this.http.delete(this.authService.getapicEndpoint() + '/v1/events'+'?id='+ documentid + "&rev=" + documentrev, options)
                        .map(res => res.json());
    }
        
}