/*
 *  App developed for the final modules in "Introduction to Mobile App
 *  Design and Development" course @Laurea.
 *  Author: Patricia Vera Hernández
 *  Student number: 1106727
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireDatabase }  from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseProvider } from './../../providers/firebase/firebase'
import { FirebaseListObservable } from 'angularfire2/database-deprecated'

import { event } from '../../models/events/events.interface';

@IonicPage()
@Component({
  selector: 'page-allevents',
  templateUrl: 'allevents.html',
})

export class AlleventsPage {

  events: string = "incidents";

  incidentsRef$;
  safeplacesRef$;
  arrIncidents = [];
  arrSafePlaces = [];

  constructor(private fire: AngularFireAuth, public fbp: FirebaseProvider, private alertCtrl: AlertController, public navCtrl: NavController, private fdb: AngularFireDatabase) {
    this.incidentsRef$ = this.fdb.list<event>('/incidents/').valueChanges().subscribe( _data => {
      this.arrIncidents = _data;
    });

    this.safeplacesRef$ = this.fdb.list<event>('/safeplaces/').valueChanges().subscribe( _data => {
      this.arrSafePlaces = _data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlleventsPage');
  }

  selectIncident(eventClicked: event) {
    var eventType: string = 'incident';
    this.navCtrl.push('EventPage', {eventClicked, eventType});
  }

  selectSafePlace(eventClicked: event) {
    var eventType: string = 'safe place';
    this.navCtrl.push('EventPage', {eventClicked, eventType});
  }

}
