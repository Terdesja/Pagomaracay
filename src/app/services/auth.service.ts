import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { map, first, switchMap } from 'rxjs/operators';

export interface User {
  uid: string,
  id: string,
  name?: string,
  email?: string,
  photo?: string,
  followedBusiness?: Array<any>
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public selectedUserID: any = '';
  public selectedBusinessID: any = '';
  private userCollection: AngularFirestoreCollection<User>;
  user: Observable<User>;
  public userIDD: any = 'userID';

  getOneUser(userID: any) {
    throw new Error("Method not implemented.");
  }
  public singIn = 0;


  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {

    this.userCollection = this.afs.collection<User>('user');
    // Get auth data, then get firestore user document (subscribe) || null
    this.user = this.afAuth.authState.pipe(
      first(),
      switchMap(user => {
        if (user) {
          return this.userCollection.doc<User>(user.uid).valueChanges()
        } else {
          return of(null);
        }
      })
    )

  }


  registerUser(data) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
        .then((resReg): any => {
          console.log('registerUser creatUser resReg', resReg)
          let dataUser = {
            id: resReg.user.uid,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            driver: data.driver,
            approved: data.approved,
            driverstatus: 1,
            admin: data.admin
          };

          this.afs.collection('users').doc(resReg.user.uid).set(dataUser, { merge: true })
            .then(res => {
              console.log('function saveUserData ready', dataUser);
              resolve(dataUser);
            })


          /* this.saveUserData(dataUser, resReg.user.uid)
            .then(res => {
              console.log('saveUserData', res)
              resolve(res);
            })
            .catch(err => {
              reject(err);
            }) */
        })
        .catch(err => {
          reject(err)
        });
    })
  }


  getDataUser(userID) {
    return new Promise((resolve, reject) => {
      this.afs.collection('user').doc(userID).ref.get().then((result) => {
        resolve(result.data());
      });
      console.log("Info del usuario", userID)
    })
  }

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      this.afAuth.onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          resolve(false);
        }
      });
    })
  }


  saveUserData(data, userID) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('user').doc(userID).set(data, { merge: true })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
      console.log("el id del usuario para la imagen", userID)
      console.log("el id de la imagen", data)

    })
  }

  async logoutUser(): Promise<void> {
    try {
      await this.afAuth.signOut()
        .then(() => {
          //  await FacebookLogin.logout();
          //  await GoogleAuth.signOut();
          this.singIn = 0;
        }).catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
}