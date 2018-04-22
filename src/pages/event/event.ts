/*
 *  App developed for the final modules in "Introduction to Mobile App
 *  Design and Development" course @Laurea.
 *  Author: Patricia Vera Hernández
 *  Student number: 1106727
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { event } from '../../models/events/events.interface';

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  eventSelected: event;
  eventType: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // Get the event parameters given from the 
    // parent page (allevents or profile)
    this.eventSelected = this.navParams.get("eventClicked");
    this.eventType = this.navParams.get("eventType");

    console.log(this.eventSelected);
    console.log(this.eventType);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

}
