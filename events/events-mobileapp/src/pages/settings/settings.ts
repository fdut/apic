import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { Token } from '../../../www/assets/token.interface';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {

  private tokens: Token;
  private access_token: string;
  private token_type: string;
  private expires_in: number;
  private id_token: string;
  private refresh_token: string;
  private scope: string;

  private clientid: string;
  private clientsecret: string;
  private apicEndpoint: string;

  constructor(private authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.tokens = this.authService.getAuth();

    if (typeof this.tokens != 'undefined'){
    this.token_type = this.tokens.token_type;
    this.access_token = this.tokens.access_token;
    this.expires_in = this.tokens.expires_in;
    this.id_token = this.tokens.id_token;
    this.refresh_token = this.tokens.refresh_token;
    this.scope = this.tokens.scope;
    }

    this.clientid = this.authService.getClientID();
    this.clientsecret = this.authService.getClientSecret();
    this.apicEndpoint = this.authService.getapicEndpoint();

  }

}
