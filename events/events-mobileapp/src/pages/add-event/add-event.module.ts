import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEventPage } from './add-event';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AddEventPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEventPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDFwWr2k6eh1hFY9FZuG4Ai-uSp1z8tcyc'
    })
  ],
})
export class AddEventPageModule {}
