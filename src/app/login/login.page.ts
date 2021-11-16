import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  uid: string;
  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private fb: FormBuilder,
    private alertController: AlertController,
    public authService: AuthService, ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({

      email: ["", Validators.required],
      password: ["", Validators.required]
    }

    )
  }

  login() {
    let user = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }
    if ((user.password == this.loginForm.controls['password'].value) &&
      (user.email == this.loginForm.controls['email'].value)) {

      this.auth.signInWithEmailAndPassword(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      ).then(userData => {
        this.loginAlert('', "Haz iniciado sesion correctamente")
        console.log("Data de ususario", userData);

      }).catch(e => {
        this.loginAlert('Error', "Correo electronico o contraseña errados")
        console.log(e);
      })
      console.log("info login", this.loginForm.value);
      
    }
  }

  async loginAlert(status, sms) {

    const alert = await this.alertController.create({

      header: status,
      subHeader: sms,

      buttons: ['ok']
    });

    await alert.present();
  }
}
