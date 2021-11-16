import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-createbusiness',
  templateUrl: './createbusiness.page.html',
  styleUrls: ['./createbusiness.page.scss'],
})
export class CreatebusinessPage implements OnInit {

  public loading: any;
  public files: any;
  public imgUrl: any;
  private user: any;

  constructor(
    private formBuild: FormBuilder,
    private afStorage: AngularFireStorage,
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private navCtrl: NavController,
  ) {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  createbusinessForm: FormGroup;
  ngOnInit() {
    this.createbusinessForm = this.formBuild.group({
      businessname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])),

      businessdirection: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      ownerphone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(11)
      ])),
    })
  }

  async presentLoading(message) {
    this.loading = await this.loadingCtrl.create({
      message: message,
      spinner: 'circles',
      duration: 50000,
      translucent: true,
      cssClass: 'loader',
    });
    await this.loading.present();
  }

  async fileUpload(user) {
    return new Promise((resolve, reject) => {
      let id = Math.random().toString(36).substr(2, 9);
      const imagePath = `/business/images/${user.uid}-${id}`;
      this.afStorage.upload(imagePath, this.files).then((upload) => {
        if (upload.state === 'success') {
          this.afStorage.ref(imagePath).getDownloadURL().subscribe((getDownload) => {
            resolve(getDownload);
          });
        }
      }).catch(err => {
        reject(err);
      });
    })
  }

  async onSubmit(data) {
    await this.presentLoading('Saving...');

    let saveData = {
      business: {
        businessname: data.businessname,
        businessdirection: data.businessdirection,
        ownerphone: data.ownerphone,
        photo: null
      }
    }
    if (this.files) {
      this.fileUpload(this.user).then(downloadUrl => {
        saveData.business.photo = downloadUrl;
        console.log('URL DE LA IMAGEN', downloadUrl)
        this.authService.saveUserData(saveData, this.user.uid).then(result => {
          this.loading.dismiss();
          // this.goBusinessProfile(this.user.uid);
        }).catch(err => { console.log('failed saveUserData', err); });
      }).catch(err => { console.log('failed to upload picture', err); })
    } else {
      this.authService.saveUserData(saveData, this.user.uid).then(result => {
        this.loading.dismiss();
        // this.goBusinessProfile(this.user.uid);
      });
    }
  }

  goBusinessProfile(businessID) {
    this.authService.selectedBusinessID = businessID;
    this.navCtrl.navigateForward(["businessprofile"]);
  }

  async upload(evt) {
    let vm = this;
    this.files = evt.target.files[0];
    var tgt = evt.target || window.event.srcElement,
      files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        vm.imgUrl = fr.result;
      }
      fr.readAsDataURL(files[0]);
    }

    // Not supported
    else {
      // fallback -- perhaps submit the input to an iframe and temporarily store
      // them on the server until the user's session ends.
    }
  }

}
