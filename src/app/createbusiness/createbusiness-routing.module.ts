import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatebusinessPage } from './createbusiness.page';

const routes: Routes = [
  {
    path: '',
    component: CreatebusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatebusinessPageRoutingModule {}
