import { Component } from '@angular/core';
import { IonicPage, AlertController, ModalController } from 'ionic-angular';
import { ApisService } from '../../services/apis';
import { AuthService } from '../../services/auth';
import { NgForm } from '@angular/forms';
import { Location } from '../../models/location';
import { Event } from '../../models/event';
import { SetLocationPage } from '../set-location/set-location';

import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})

export class AddEventPage {

  constructor(private apisService: ApisService, 
              private authService: AuthService, 
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController, 
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController) {
  }

  error: any;
  location: Location = {
    lat: 48.862725,
    lng: 2.287592
  };
  locationIsSet = false;

  ionViewDidLoad(){
    console.log('ionViewDidLoad AddEventPage');
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

  onLocate(){
    const loader = this.loadingCtrl.create({
      content: 'Getting your location ...'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          console.log(error);
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Could get location, please pick it manually!',
            duration: 2500
          });
          toast.present();
        }
      )
  }


  onSubmit(form: NgForm){
    
    console.log("onSubmit: " + JSON.stringify(form.value));

    const event = new Event(form.value.title,form.value.description,new Date, this.location,);

    if (typeof this.authService.getToken() !== "undefined"){
      console.log("Post Request");
      this.apisService.postEvent(event)
      .subscribe((data) => { console.log(data);
        const alert = this.alertCtrl.create({
        title: 'Add Event !',
        message: 'Event added with success',
        buttons: ['Ok']
        });
        alert.present();
        form.reset();
        this.locationIsSet = false;
      }
      ,(err) => {
        this.error = 'Unable to connect.';
        let toast = this.toastCtrl.create({
        message: "Failed to add Event ! : ",
        showCloseButton: true,
        duration: 3000,
        closeButtonText: 'Ok',
        position: 'bottom'
      });
      toast.present();
      }
      ,() => {console.log("PostEvents Complete");
      });
   }else{
    const alert = this.alertCtrl.create({
      title: 'Unable to add Event !',
      message: 'Sign-in before to add Event.',
      buttons: ['Ok']
      });
      alert.present();
   }  
  }


  
}
