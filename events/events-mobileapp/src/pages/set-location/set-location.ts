import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { Location } from '../../models/location';
import { Loading } from 'ionic-angular/components/loading/loading';

@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})

export class SetLocationPage {

  location: Location;
  marker: Location;

  constructor(private navParams: NavParams, private viewCtrl: ViewController) {
    this.location = this.navParams.get('location');
    if (this.navParams.get('isSet')){
      this.marker = this.location;
    }
  }

  onSetMaker(event: any){
    console.log(event);
    this.marker = new Location(event.coords.lat,event.coords.lng);
  }

  onConfirm(){
    this.viewCtrl.dismiss({location: this.marker});
  }

  onAbort(){
    this.viewCtrl.dismiss();
  }

}
