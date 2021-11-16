import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import firebase from 'firebase';


export interface User {
  name: string,
  uid: string
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  uid: string;
  db: any;

  constructor(private afs: AngularFirestore) { }

  setUid(_uid: string) {
    this.uid = _uid
  }

  getUid() {
    return this.uid;
  }

  getUser(userID) {
    return new Promise((resolve, reject) => {
      this.afs.collection('user').doc(userID).ref.get().then((result) => {
        resolve(result.data());
      });
      console.log("USER ID", userID)
    })
  }

}
