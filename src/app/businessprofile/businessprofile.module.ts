import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessprofilePageRoutingModule } from './businessprofile-routing.module';

import { BusinessprofilePage } from './businessprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessprofilePageRoutingModule
  ],
  declarations: [BusinessprofilePage]
})
export class BusinessprofilePageModule {}
