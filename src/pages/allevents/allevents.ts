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

@IonicPage()
@Component({
  selector: 'page-allevents',
  templateUrl: 'allevents.html',
})
export class AlleventsPage {

  events: string = "incidents";
  arrIncidents = [];
  arrSafePlaces = [];

  constructor(private fire: AngularFireAuth, public fbp: FirebaseProvider, private alertCtrl: AlertController, public navCtrl: NavController, private fdb: AngularFireDatabase) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlleventsPage');
  }

}
