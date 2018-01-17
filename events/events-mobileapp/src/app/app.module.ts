import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { SigninPage } from '../pages/signin/signin';
import { TabsPage } from '../pages/tabs/tabs';
import { EventsPage } from '../pages/events/events';
import { EventPage } from '../pages/event/event';
import { SettingsPage } from '../pages/settings/settings';

import { HttpModule } from '@angular/http';
import { AuthService } from '../services/auth';
import { ApisService } from '../services/apis';
import { AddEventPage } from '../pages/add-event/add-event';
import { AgmCoreModule } from '@agm/core';
import { SetLocationPage } from '../pages/set-location/set-location';

import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SigninPage,
    EventPage,
    EventsPage,
    SettingsPage,
    AddEventPage,
    SetLocationPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDFwWr2k6eh1hFY9FZuG4Ai-uSp1z8tcyc'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    SigninPage,
    EventsPage,
    EventPage,
    SettingsPage,
    AddEventPage,
    SetLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService, ApisService,
    Geolocation
  ]
})
export class AppModule {}
