/*
 *  App developed for the final modules in "Introduction to Mobile App
 *  Design and Development" course @Laurea.
 *  Author: Patricia Vera Hernández
 *  Student number: 1106727
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  loading: Loading;
  createSuccess = false;
  registerCredentials = { email: '', password: '' };

  constructor(private fire: AngularFireAuth, public nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // Register user in the database
  // Creates one new user with its own email and password
  // We are not allowing usernames - only email!
  registerUser(){
    this.fire.auth.createUserWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password)
    .then(data =>{
      // User accessed the app
      console.log('got data ', data);
      this.showSuccess('We created your account successfully!')
      this.nav.setRoot(MenuPage);
    })
    .catch(error => {
      // There was an error in the process
      console.log('got an error ', error);
      this.showError(error);
    })

    console.log('Would register user with ', this.registerCredentials.email, this.registerCredentials.password);
  }

  // Loading code
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  // Pop-up in case of error
  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });

    alert.present();
  }

  // Pop-up in case of success
  showSuccess(text) {
    let alert = this.alertCtrl.create({
      title: 'Well done!',
      subTitle: text,
      buttons: ['OK']
    });

    alert.present();
  }

}

