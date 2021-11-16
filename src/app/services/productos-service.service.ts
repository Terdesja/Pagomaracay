import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


export interface Producto {
  productname: string,
  unityprice: string,
  bultoprice: string,
}


@Injectable({
  providedIn: 'root'
})
export class ProductosServiceService {

  id: string;
  db: any;

  constructor(private afs: AngularFirestore) { }

  setUid(_uid: string) {
    this.id = _uid
  }

  getproductid() {
    return this.id;
  }

  getProduct(prodID) {
    return new Promise((resolve, reject) => {
      this.afs.collection('productos').doc(prodID).ref.get().then((result) => {
        resolve(result.data());
      });
      console.log("USER ID", prodID)
    })
  }
}
