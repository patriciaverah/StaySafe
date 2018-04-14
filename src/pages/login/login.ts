/*
 *  App developed for the final modules in "Introduction to Mobile App
 *  Design and Development" course @Laurea.
 *  Author: Patricia Vera Hernández
 *  Student number: 1106727
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { MenuPage } from '../menu/menu';
import { AlleventsPage } from '../allevents/allevents';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // click will send to next page
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(private fire: AngularFireAuth, private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // Goes to register page
  public createAccount() {
    this.nav.push('RegisterPage');
  }

  // User trying to log in
  // Look for matching credentials in the database
  // We are not allowing usernames - only emails!
  public login() {
    this.showLoading();
    this.fire.auth.signInWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password)
    .then(data => {
      console.log('got some data ', data);
      // user is logged in
      // User accessed the app
      this.showSuccess('You are now logged in!');
      this.nav.setRoot(MenuPage);
    })
    .catch(error => {
      console.log('got an error ', error);
      // not logged in
      // There was an error in the process
      this.showError(error);
    })
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
