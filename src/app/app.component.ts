import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './services/user.service';
import { AuthService } from '../../src/app/services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  isLogged: boolean = true;
  public selectedIndex = 0;
  public folder: string;
  public user: any;


  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private auth: AngularFireAuth,
  ) {
    this.initializeApp();
    this.verifyCurrentUser();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    let isAuthenticated: any;
    this.authService.isAuthenticated().then((data) => {
      // console.log('initializeApp', data)
      // this.authenticationService.logoutUser()
      if (data) {
        isAuthenticated = data;
        // console.log('isAuthenticated', data);
        console.log('isAuthenticated User ID', isAuthenticated.uid);
        this.authService.getDataUser(isAuthenticated.uid).then((user) => {
          console.log('getDataUser', user);

          this.user = user;
          console.log('USER', this.user);
          if (this.user === 'true') {
            this.router.navigate(['folder']);
            console.log('ENTRE NORMAL')
          }
        });
      }
      else {
        this.router.navigate(["login"]);
      }
    })

    let userID: any;
    this.authService.isAuthenticated().then((data) => {
      if (data) {
        isAuthenticated = data;
        userID = data;
        console.log('Autenticacion', isAuthenticated.uid);

        this.authService.getDataUser(isAuthenticated.uid).then((user) => {
          console.log('getDataUser', user);
        });
      }
    })
  }

  verifyCurrentUser() {
    this.auth.authState.subscribe((e: any) => {
      console.log("info", e);
      if (e == null) {
        this.router.navigate(['/login'])
      } else {

        localStorage.setItem("uid", e.uid)
        this.router.navigate(['/folder'], { replaceUrl: true })
      }
    })

  }

  goAction(action) {
    switch (action) {
      case 'logout':
        this.authService.logoutUser().then(() => {
          console.log('Logged out.');
          this.navCtrl.navigateRoot(['login']);
        })
        break;

      // default:
      //   console.log("forced")
      //   this.navCtrl.navigateForward('/members/business-profile' + '?business=' + this.user.uid);
      //   break;
    }
  }


  ngOnInit() {

  }

  goToProducts() {
    this.router.navigate(['./pagina']);
  }

  goToShop() {
    this.router.navigate(['./tienda']);
  }


  goToPerfil(user) {
    let isAuthenticated: any;
    this.authService.isAuthenticated().then((data) => {
      if (data) {
        isAuthenticated = data;
        user = data;
        console.log('Autenticacion', isAuthenticated.uid);

        this.authService.getDataUser(isAuthenticated.uid).then((user) => {
          console.log('getDataUser', user);
          this.navCtrl.navigateForward('userprofile' + '?user=' + isAuthenticated.uid);
          console.log('Go Usuario', user);
        })
      }

      // this.navCtrl.navigateForward('userprofile')
    })
  }


  goToHome() {
    this.navCtrl.navigateForward('folder');
  }

  goToChat() {
    this.navCtrl.navigateForward('chat');
  }

  goToFavs() {
    this.navCtrl.navigateForward('favoritos');
  }

  goToMap() {
    this.navCtrl.navigateForward('maps');
  }
  
}
