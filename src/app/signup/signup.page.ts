import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public loading: any;

  constructor(
    private afs: AngularFirestore,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    private auth: AngularFireAuth,
    private fb: FormBuilder,
    private alertController: AlertController,
    private db: AngularFireDatabase) {
  }

  registerForm: FormGroup;
  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', Validators.required],
      phone: ['', Validators.required],
      direction: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    })
  }

  register() {
    let user = {
      email: this.registerForm.controls['mail'].value,
      password: this.registerForm.controls['password'].value
    }

    if (user.password == this.registerForm.controls['confirm'].value) {
      this.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(userData => {
          this.afs.collection('user').doc(userData.user.uid).set(this.registerForm.value)
          console.log(userData);
        }).catch(e => {
          console.log(e);
        })
    }
  }

  async registerUser(data) {
    await this.presentLoading('');
    await this.authService.registerUser(data)
      .then(res => {
        let dataUser = res;
        //  this.authService.user.subscribe(res => console.log('AuthService user from login ', res));
        console.log('registerUser data', dataUser);
        console.log('registerUser res', res)
        this.loading.dismiss();
        // this.errorMessage = "";
      })
  }

  async presentLoading(message) {
    this.loading = await this.loadingCtrl.create({
      message: '',
      spinner: 'circles',
      duration: 50000,
      translucent: true,
      cssClass: 'loader',
    });
    await this.loading.present();
  }

}
