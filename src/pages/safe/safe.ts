/*
 *  App developed for the final modules in "Introduction to Mobile App
 *  Design and Development" course @Laurea.
 *  Author: Patricia Vera Hernández
 *  Student number: 1106727
 */

import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase }  from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { event } from '../../models/events/events.interface';

@IonicPage()
@Component({
  selector: 'page-safe',
  templateUrl: 'safe.html',
})
export class SafePage {

  // New event structure
  newItem = {} as event;

  constructor(private fire: AngularFireAuth, public fbp: FirebaseProvider, private alertCtrl: AlertController, public navCtrl: NavController, private fdb: AngularFireDatabase) {
    // Get the user logged in to save in with the event info
    this.newItem.eventAuthor = fire.auth.currentUser;

    // Get today's date
    this.newItem.eventDate = new Date().toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafePage');
  }

  newSafePlace(){
    this.fbp.addSafePlace(this.newItem);
    this.navCtrl.pop();
  }

}
