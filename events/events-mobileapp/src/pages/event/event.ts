import { cdbEvent } from './../../../www/assets/event.interface';
import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { NavParams, ViewController, ModalController } from 'ionic-angular';

import { NgForm } from '@angular/forms';
import { Location } from '../../models/location';
import { Event } from '../../models/event';
import { SetLocationPage } from '../set-location/set-location';

import { ApisService } from '../../services/apis';
import { AuthService } from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})

export class EventPage {  

  location: Location = {
    lat: 48.862725,
    lng: 2.287592
  };
  locationIsSet = false;

  event: cdbEvent;
  title: string;
  description: string;
  error: any;
  
  constructor(public navParams: NavParams,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private apisService: ApisService, 
    private authService: AuthService, 
    private alertCtrl: AlertController,
    ) {

      this.event = this.navParams.get('event');
      this.title = this.event.doc.title;
      this.description = this.event.doc.description;
  }

  ionViewDidLoad() {
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }

  onOpenMap(){
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          console.log("data: " + JSON.stringify(data));
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    )
  }

  onSubmit(form: NgForm){    
    console.log("onSubmit: " + JSON.stringify(form.value));

    const uevent = new Event(form.value.title,form.value.description,new Date, this.location,);
    
        if (typeof this.authService.getToken() !== "undefined"){
          console.log("Put Request");
          this.apisService.putEvent(this.event.id,this.event.doc._rev,uevent)
          .subscribe((data) => { console.log(data);
            const alert = this.alertCtrl.create({
            title: 'Updated Event !',
            message: 'Event updated with success',
            buttons: ['Ok']
            });
            alert.present();
            form.reset();
            this.locationIsSet = false;
            this.onLeave();
          }
          ,(err) => {this.error = 'Unable to connect.';
            const alert = this.alertCtrl.create({
            title: 'Failed to update Event !',
            message: 'Unable to connect.',
            buttons: ['Ok']
            });
            alert.present();}
          ,() => {console.log("PutEvent Complete");
          });
       }else{
        const alert = this.alertCtrl.create({
          title: 'Unable to update Event !',
          message: 'Sign-in before to add Event.',
          buttons: ['Ok']
          });
          alert.present();
       }  

  }

}
