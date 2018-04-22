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
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { event } from '../../models/events/events.interface';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-editincident',
  templateUrl: 'editincident.html',
})
export class EditincidentPage {

  incidentRef$; 
  eventID: string;
  incident = {} as event;
  newItem = {} as event;
  auxIncidents = [];
  incidentSubscription: Subscription;

  constructor(private fire: AngularFireAuth,  public navParams: NavParams, public fbp: FirebaseProvider, private alertCtrl: AlertController, public navCtrl: NavController, private fdb: AngularFireDatabase) {
    this.eventID = this.navParams.get('eventID');

    console.log(this.eventID);

    // Set the scope of out Firebase Obbject equal to or selected event
    this.incidentRef$ = this.fdb.list<event>('/incidents/').snapshotChanges().map(actions => {
      return actions.map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      });
    }).subscribe( _data => {
      this.auxIncidents = _data;
      this.auxIncidents.forEach(element => {
        console.log(element);
        if (element.$key === this.eventID) {
          console.log('EVENTO ENCONTRADO');
          this.incident = element;
          console.log(this.incident);
        }
      });
    });

    this.incidentRef$ = this.fdb.object(`/incidents/${this.incident.$key}`);
    this.incidentSubscription = 
      this.incidentRef$.subscribe(incidentEvent => {
        this.newItem = incidentEvent;
      });

    // Get today's date
    this.newItem.eventDate = new Date().toDateString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditincidentPage');
  }

  // Update Firebase node with new item data 
  /*editIncident(newItem: event) {
    this.incidentRef$.update(newItem);
    // Send user back to previous page 
    this.navCtrl.pop();
  }*/

  // Unsubscribe from the observable 
  // while leaving the page
  ionViewWillLeave() {
    this.incidentSubscription.unsubscribe();
  }

}
