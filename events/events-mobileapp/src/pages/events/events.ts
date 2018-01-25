import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ApisService } from '../../services/apis';
import { AuthService } from '../../services/auth';

import { cdbEvent } from '../../assets/event.interface';
import { ModalController } from 'ionic-angular';
import { EventPage } from '../event/event';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})

export class EventsPage {

  events: any;
  error: any;

  constructor(private apisService: ApisService, 
    private authService: AuthService,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EventsPage');
  }

  ionViewDidEnter(){
    //console.log('ionViewDidEnter EventsPage');
    this.onLoadEvent();
  }

  onViewEvent(event: cdbEvent){
    console.log("onViewEvent : " + JSON.stringify(event) );
    const modal = this.modalCtrl.create(EventPage, {event: event});
    modal.present();
    modal.onDidDismiss(
      () => {
        this.onLoadEvent();
      }
    );
  }


  onDeleteEvent(event: cdbEvent){
    if (typeof this.authService.getToken() !== "undefined"){
      
          this.apisService.deleteEvent(event.id,event.doc._rev)
                .subscribe((data) => {
                  console.log(data);
                  this.onLoadEvent();
                }
                ,(err) => this.error = 'Unable to delete.'
                ,() => {console.log("DeleteEvent Complete")});
               
          }    
             
  }      
    
  onLoadEvent(){
        if (typeof this.authService.getToken() !== "undefined"){
          
                    this.apisService.getEvents()
                    .subscribe((data) => {this.events = data.rows;
                    }
                    ,(err) => this.error = 'Unable to connect.'
                    ,() => {console.log("GetEvents Complete")});
          
                  }         
      }
}
