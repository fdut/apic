import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ApisService } from '../../services/apis';
import { AuthService } from '../../services/auth';
import { cdbEvent } from '../../assets/event.interface';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})

export class EventsPage {

  events: any;
  error: any;

  constructor(private apisService: ApisService, private authService: AuthService) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EventsPage');
  }

  ionViewDidEnter(){
    //console.log('ionViewDidEnter EventsPage');
    this.onLoadEvent();
  }

  onViewEvent(){
    console.log("onViewEvent");
  }


  onDeleteEvent(event: cdbEvent){
    //console.log("onDeleteEvent: " + JSON.stringify(event) + " _id: " + event.doc._id);
    
    if (typeof this.authService.getToken() !== "undefined"){
      
          this.apisService.deleteEvents(event.id,event.doc._rev)
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
