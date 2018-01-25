import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController, NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { TabsPage } from '../tabs/tabs';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  tabsPage= TabsPage;

  constructor(private navCtrl: NavController
              ,private authService: AuthService
              ,private loadingCtrl: LoadingController
              ,private alertCtrl: AlertController
              ,private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }


  onSignin(form: NgForm) {
    console.log(form.value);
    
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();

    this.authService.auth(form.value.email, form.value.password)
      .subscribe(data => {
        console.log(data);
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Signin Sucess ...',
          message: JSON.stringify(data),
          buttons: ['Ok']
          });
          alert.present();
        this.authService.setAuth(data);
        this.navCtrl.setRoot(this.tabsPage);
      }  , error => {
        loading.dismiss();
        console.log(JSON.stringify(error));// Error getting the data
        let toast = this.toastCtrl.create({
          message: "Signin failed! : \n" + error.status + ', ' + error._body,
          showCloseButton: true,
          duration: 3000,
          closeButtonText: 'Ok',
          position: 'bottom'
        });
        toast.present();
      });
  }

  onAbort(){
    this.navCtrl.setRoot(this.tabsPage);
  }

}
