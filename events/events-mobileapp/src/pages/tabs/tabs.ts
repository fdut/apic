import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { EventsPage } from '../events/events';
import { AddEventPage } from '../add-event/add-event';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage {
  eventsPage=EventsPage;
  addEventPage=AddEventPage;
}
