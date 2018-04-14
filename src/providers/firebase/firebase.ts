import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

// In this file i've created the necessary functions
// to make the database work properly:
  // store and get objects

@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) { }

  // Gets all the incidents registered
  getIncidents() {
    return this.afd.list('/incidents/');
  }

  // Adds an incident to the database
  // only inserting its name
  addIncident(newItem, email) {
    this.afd.list('/incidents/').push({newItem, email});
  }

  // Removes an incident from the database
  // using the ID
  removeIncident(id) {
    this.afd.list('/incidents/').remove(id);
  }

  // Gets all the safe places registered
  getSafePlace() {
    return this.afd.list('/safeplace/');
  }

  // Adds an safe place to the database
  // only inserting its name
  addSafePlace(newItem, email) {
    this.afd.list('/safeplace/').push({newItem, email});
  }

  // Removes an safe place from the database
  // using the ID
  removeSafePlace(id) {
    this.afd.list('/safeplace/').remove(id);
  }

}