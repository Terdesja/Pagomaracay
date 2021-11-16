import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-businessprofile',
  templateUrl: './businessprofile.page.html',
  styleUrls: ['./businessprofile.page.scss'],
})
export class BusinessprofilePage implements OnInit {

  public producto: any = [];
  itemRef: any;
  contacts = [];
  id: string;

  
  constructor(private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router) { }

  ngOnInit() {
  }

//   goToPagina() {
//     this.navCtrl.navigateForward('pagina');
//   }

//   goToPagina2() {
//     this.navCtrl.navigateForward('pagina2');
//   }

}
