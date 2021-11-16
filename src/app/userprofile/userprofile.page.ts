import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Platform } from '@ionic/angular';
import { User } from 'src/app/services/user.service'


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {

  dataSource: object[] = [];
  public user: any;
  name: string = '';
  lastname: string = '';
  uid: string;
  contacts = [];
  itemRef: any;
  afs: any;

  constructor(private db: AngularFireDatabase,
    private userService: UserService,
    private authService: AuthService,
    private platform: Platform) {

    this.uid = localStorage.getItem("uid")


  }
  //esto es para registrar usuarios a otra lista usuarios, nada mas
  save() {
    this.db.database.ref('user/' + this.uid).set({ name: this.name, lastname: this.lastname })
      .catch(e => {
        console.log(e);
      })

  }


  ngOnInit() {
    this.getUserData()
    this.itemRef = this.db.object('user/' + this.uid);
    this.itemRef.snapshotChanges().subscribe(action => {
      let data = action.payload.val()
      console.log(data);

      for (let k in data) {

        let user = data[k];

        console.log(user, k)
        this.contacts.push(user)
      }
    });
  }

  getUserData() {
    this.userService.getUser(this.platform.getQueryParam('user')).then((user) => {
      this.user = user;
    })
  }


}