import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Animation, AnimationController, ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit, AfterViewInit {
  products: Observable<any[]>;
  @ViewChild('myfab', { read: ElementRef }) carBtn: ElementRef;
  cart = {};
  cartAnimation: Animation;

  constructor(private productService: ProductService, private animationCtrl: AnimationController, private modalCtrl: ModalController) {}
 
  ngOnInit() {
    this.products = this.productService.getProducts();
 
    // Listen to Cart changes
    this.productService.cart.subscribe(value => {
      this.cart = value;
    });
  }
 
  ngAfterViewInit() {
    // Setup an animation that we can reuse
    this.cartAnimation = this.animationCtrl.create('cart-animation');
    this.cartAnimation
    .addElement(this.carBtn.nativeElement)
    .keyframes([
      { offset: 0, transform: 'scale(1)' },
      { offset: 0.5, transform: 'scale(1.2)' },
      { offset: 0.8, transform: 'scale(0.9)' },
      { offset: 1, transform: 'scale(1)' }
    ])
    .duration(300)
    .easing('ease-out');
  }
 
  addToCart(event, product) {
    // event.stopPropagation();
    this.productService.addToCart(product.id);
    // this.cartAnimation.play();
  }
 
  removeFromCart(event, product) {
    // event.stopPropagation();
    this.productService.removeFromCart(product.id);
    // this.cartAnimation.play();
  }
 
  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage
    });
    await modal.present();
  }
}