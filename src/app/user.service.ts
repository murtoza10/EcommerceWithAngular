import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath = '/users';

  usersRef: AngularFireList<AppUser> = null;

  constructor(private db:AngularFireDatabase) { 
    this.usersRef = db.list(this.dbPath);
  }

  save(user :firebase.User){
    this.db.object('/users/'+user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/'+uid);
  }

  createCustomer(user: AppUser): void {
    this.usersRef.push(user);
  }

  updateCustomer(key: string, value: any): Promise<void> {
    return this.usersRef.update(key, value);
  }

  deleteCustomer(key: string): Promise<void> {
    return this.usersRef.remove(key);
  }

  getCustomersList(): AngularFireList<AppUser> {
    return this.usersRef;
  }

  deleteAll(): Promise<void> {
    return this.usersRef.remove();
  }
}