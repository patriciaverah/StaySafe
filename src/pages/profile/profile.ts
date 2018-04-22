/*
 *  App developed for the final modules in "Introduction to Mobile App
 *  Design and Development" course @Laurea.
 *  Author: Patricia Vera Hernández
 *  Student number: 1106727
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

import { AngularFireDatabase }  from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseProvider } from './../../providers/firebase/firebase';

import { event } from '../../models/events/events.interface';
import { User } from '@firebase/auth-types';
import { EditincidentPage } from '../editincident/editincident';
import { EditsafeplacePage } from '../editsafeplace/editsafeplace';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  events: string = "profile";

  incidentsRef$;
  safeplacesRef$;
  arrIncidents = [];
  arrSafePlaces = [];
  auxIncidents = [];
  auxSafePlaces = [];

  user: User;
  nIncidents = 0;
  nSafePlaces = 0;

  constructor(private fire: AngularFireAuth, public fbp: FirebaseProvider, public navCtrl: NavController, private alertCtrl: AlertController, private fdb: AngularFireDatabase, private actionSheetCtrl: ActionSheetController) {
    this.getCurrentUser();

    this.getAllEvents();

    this.incidentsRef$ = this.fdb.list<event>('/incidents/').snapshotChanges().map(actions => {
      return actions.map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      });
    }).subscribe( _data => {
      this.auxIncidents = _data;
      this.auxIncidents.forEach(element => {
        console.log(element);
        if (element.author === this.user.email) {
          this.arrIncidents.push(element);
          this.nIncidents += 1;
        }
      });
    });

    this.safeplacesRef$ = this.fdb.list<event>('/safeplaces/').snapshotChanges().map(actions => {
      return actions.map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      });
    }).subscribe( _data => {
      this.auxSafePlaces = _data;
      this.auxSafePlaces.forEach(element => {
        if (element.author === this.user.email) {
          this.arrSafePlaces.push(element);
          this.nSafePlaces += 1;
        }
      });
    });

    // Display an alert explaining the page
    // this.showExplanation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getCurrentUser() {
    // Get the current user logged in
  }
  
  getAllEvents() {
    
  this.user = this.fire.auth.currentUser;
  }

  selectIncident(eventClicked: event) {
    var eventType: string = 'incident';
    this.navCtrl.push('EventPage', {eventClicked, eventType});
  }

  selectSafePlace(eventClicked: event) {
    var eventType: string = 'safe place';
    this.navCtrl.push('EventPage', {eventClicked, eventType});
  }

  // Showing the user what is this page about
  showExplanation() {
    let alert = this.alertCtrl.create({
      title: 'Profile page',
      message: 'In this page you will see the events you posed, and you will be able to delete them.',
      buttons: ['OK']
    });

    alert.present();
  }

  // Asking the user for confirmation 
  // about the item removal
  presentConfirmIncident(eventSelected: event){
    let alert = this.alertCtrl.create({
      title: 'Confirm removal',
      message: 'Do you want to remove this item completely?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // User does not want to remove item
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            // User wants to remove item
            console.log('Confirm removal');
            this.deleteIncident(eventSelected.$key);
          }
        }
      ]
    });

    alert.present();
  }

  // Asking the user for confirmation 
  // about the item removal
  presentConfirmSafePlace(eventSelected: event){
    let alert = this.alertCtrl.create({
      title: 'Confirm removal',
      message: 'Do you want to remove this item completely?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // User does not want to remove item
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            // User wants to remove item
            console.log('Confirm removal');
            this.deleteSafePlace(eventSelected.$key);
          }
        }
      ]
    });

    alert.present();
  }

  // Call to firebase.ts
  // Removing an existing item from user's list
  deleteIncident(id) {
    this.fbp.removeIncident(id);
    this.navCtrl.push('ProfilePage');
  }

  // Call to firebase.ts
  // Removing an existing item from user's list
  deleteSafePlace(id) {
    this.fbp.removeSafePlace(id);
    this.navCtrl.push('ProfilePage');
  }

  editIncident(id) {
    // this.navCtrl.push(EditincidentPage, {eventID: id});
  }

  editSafePlace(id) {
    // this.navCtrl.push(EditsafeplacePage, {eventID: id});
  }

}
