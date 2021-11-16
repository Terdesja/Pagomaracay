import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Plugins } from '@capacitor/core'
import firebase from 'firebase/app';
import { TemplateParseResult } from '@angular/compiler';
const { Storage } = Plugins;

const CART_STORAGE_KEY = 'MY_CART';

const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cart = new BehaviorSubject({});
  cartKey = null;
  productsCollection: AngularFirestoreCollection;
  static getProducts: any;
 
  constructor(private afs: AngularFirestore) {
    this.loadCart();
    this.productsCollection = this.afs.collection('products');
  }
  getProducts() {
    return this.productsCollection.valueChanges({ idField: 'id' });
  }

 async  loadCart(){
   const result = await Storage.get({ key: CART_STORAGE_KEY});
   console.log('Cart from storage: ', result);

   if (result.value ) {
     this.cartKey = result.value

     this.afs.collection('carts').doc(this.cartKey).valueChanges().subscribe((result: any) => {
      delete result['lastUpdate'];
      console.log('cart changed', result);
      
      
      this.cart.next(result || {});
    });

   } else{
     const fbDocument = await this.afs.collection('carts').add({
       lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
     });
     console.log('new cart: ', fbDocument);
     this.cartKey= fbDocument.id;
     await Storage.set({ key: CART_STORAGE_KEY, value: this.cartKey});
   }
  }

  addToCart(id) {
    // Update the FB cart
    this.afs.collection('carts').doc(this.cartKey).update({
      [id]: INCREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });
   
    // Update the stock value of the product
    this.productsCollection.doc(id).update({
      stock: DECREMENT
    });
  }
   
  removeFromCart(id) {
    // Update the FB cart
    this.afs.collection('carts').doc(this.cartKey).update({
      [id]: DECREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });
   
    // Update the stock value of the product
    this.productsCollection.doc(id).update({
      stock: INCREMENT
    });
  }
   
  async checkoutCart() {
    // Create an order
    await this.afs.collection('orders').add(this.cart.value);
   
    // Clear old cart
    this.afs.collection('carts').doc(this.cartKey).set({
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
}
