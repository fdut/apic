import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetLocationPage } from './set-location';

//Angular maps framework
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    SetLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(SetLocationPage),
    AgmCoreModule.forRoot({apiKey: 'KEY'})
  ],
})
export class SetLocationPageModule {}
