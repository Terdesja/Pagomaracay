import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatebusinessPageRoutingModule } from './createbusiness-routing.module';

import { CreatebusinessPage } from './createbusiness.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreatebusinessPageRoutingModule
  ],
  declarations: [CreatebusinessPage]
})
export class CreatebusinessPageModule { }
