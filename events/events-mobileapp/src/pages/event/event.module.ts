import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventPage } from './event';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    EventPage,
  ],
  imports: [
    IonicPageModule.forChild(EventPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDFwWr2k6eh1hFY9FZuG4Ai-uSp1z8tcyc'
    })
  ],
})
export class EventPageModule {}
