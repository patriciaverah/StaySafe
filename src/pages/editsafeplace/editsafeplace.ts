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
  selector: 'page-editsafeplace',
  templateUrl: 'editsafeplace.html',
})
export class EditsafeplacePage {

  safeplaceRef$; 
  eventID: string;
  safeplace = {} as event;
  newItem = {} as event;
  auxSafeplaces = [];
  safeplaceSubscription: Subscription;

  constructor(private fire: AngularFireAuth,  public navParams: NavParams, public fbp: FirebaseProvider, private alertCtrl: AlertController, public navCtrl: NavController, private fdb: AngularFireDatabase) {
    this.eventID = this.navParams.get('eventID');

    console.log(this.eventID);

    // Set the scope of out Firebase Obbject equal to or selected event
    this.safeplaceRef$ = this.fdb.list<event>('/incidents/').snapshotChanges().map(actions => {
      return actions.map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      });
    }).subscribe( _data => {
      this.auxSafeplaces = _data;
      this.auxSafeplaces.forEach(element => {
        console.log(element);
        if (element.$key === this.eventID) {
          console.log('EVENTO ENCONTRADO');
          this.safeplace = element;
          console.log(this.safeplace);
        }
      });
    });

    this.safeplaceRef$ = this.fdb.object(`/incidents/${this.safeplace.$key}`);
    this.safeplaceSubscription = 
      this.safeplaceRef$.subscribe(incidentEvent => {
        this.newItem = incidentEvent;
      });

    // Get today's date
    this.newItem.eventDate = new Date().toDateString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditsafeplacePage');
  }

  // Update Firebase node with new item data 
  /*editIncident(newItem: event) {
    this.safeplaceRef$.update(newItem);
    // Send user back to previous page 
    this.navCtrl.pop();
  }*/

  // Unsubscribe from the observable 
  // while leaving the page
  ionViewWillLeave() {
    this.safeplaceSubscription.unsubscribe();
  }

}
