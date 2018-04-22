import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { event } from '../../models/events/events.interface';

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
  addIncident(incident: event) {
    var title = incident.eventTitle;
    var description = incident.eventDescription;
    var date = incident.eventDate;
    var author = incident.eventAuthor.email;
    var location = incident.eventLocation;

    this.afd.list('/incidents/').push({title, description, author, date, location});
  }

  // Removes an incident from the database
  // using the ID
  removeIncident(id) {
    this.afd.list('/incidents/').remove(id);
  }

  // Gets all the safe places registered
  getSafePlace() {
    return this.afd.list('/safeplaces/');
  }

  // Adds an safe place to the database
  // only inserting its name
  addSafePlace(safeplace: event) {
    var title = safeplace.eventTitle;
    var description = safeplace.eventDescription;
    var date = safeplace.eventDate;
    var author = safeplace.eventAuthor.email;
    var location = safeplace.eventLocation;

    this.afd.list('/safeplaces/').push({title, description, author, date, location});
  }

  // Removes an safe place from the database
  // using the ID
  removeSafePlace(id) {
    this.afd.list('/safeplaces/').remove(id);
  }

}