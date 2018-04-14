import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { FirebaseProvider } from '../providers/firebase/firebase';

// Angular firebase database imports
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { WelcomePage } from '../pages/welcome/welcome';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

const firebaseConfig = {
  apiKey: "AIzaSyA3yeSvjR4M6wMRkKHPvR-hPBRdEDtP3wE",
  authDomain: "staysafe-ce2bf.firebaseapp.com",
  databaseURL: "https://staysafe-ce2bf.firebaseio.com",
  projectId: "staysafe-ce2bf",
  storageBucket: "staysafe-ce2bf.appspot.com",
  messagingSenderId: "443150069218"
}

@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    WelcomePage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MenuPage,
    WelcomePage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider
  ]
})
export class AppModule {}
