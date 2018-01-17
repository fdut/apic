import { Token } from './../assets/token.interface';
import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import properties from "../assets/apic"
import 'rxjs/Rx';


@Injectable()
export class AuthService {

    private authprops: {clientid: string, clientsecret: string, apicEndpoint: string};

    private tokens: Token;
    private access_token: string;
   
    constructor(private http: Http) {
        this.authprops = properties;
    }

    auth(username: string, password: string){

        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(this.authprops.clientid + ':' + this.authprops.clientsecret));
        headers.append('Content-Type', 'application/x-www-form-urlencoded' );

        let body = 'grant_type=password&scope=openid%20citizen&username=' + username + '&password=' + password;

        return this.http.post(this.authprops.apicEndpoint + '/oauth2/token',body,{ headers: headers })
        .map(res => res.json());
    }

    setAuth(data: Token){
        this.tokens = data;
        this.access_token = data.access_token;
    }

    getAuth(){
        return this.tokens;
    }

    getToken(){
        return this.access_token;
    }

    getClientID(){
        return this.authprops.clientid;
    }

    getClientSecret(){
        return this.authprops.clientsecret;
    }

    getapicEndpoint(){
        return this.authprops.apicEndpoint;
    }


}