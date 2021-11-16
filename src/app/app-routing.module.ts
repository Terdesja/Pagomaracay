import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'folder',

    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  // {
  //   path: 'pagina',
  //   children: [
  //     {
  //       path: "",
  //       loadChildren: () => import('./pagina/pagina.module').then(m => m.PaginaPageModule)
  //     },
  //     {
  //       path: ":placeId",
  //       loadChildren: () => import("./pagina/pagina-detalles/pagina-detalles.module").then(m => m.PaginaDetallesPageModule)
  //     }


  //   ]
  // },

  // {
  //   path: 'agregar-pagina',
  //   loadChildren: () => import('./pagina/agregar-pagina/agregar-pagina.module').then(m => m.AgregarPaginaPageModule)
  // },
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then(m => m.MapsPageModule)

  },

  {
    path: 'tienda',
    loadChildren: () => import('./tienda/tienda.module').then(m => m.TiendaPageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'userprofile',
    loadChildren: () => import('./userprofile/userprofile.module').then( m => m.UserprofilePageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'createbusiness',
    loadChildren: () => import('./createbusiness/createbusiness.module').then( m => m.CreatebusinessPageModule)
  },
  {
    path: 'businessprofile',
    loadChildren: () => import('./businessprofile/businessprofile.module').then( m => m.BusinessprofilePageModule)
  },
  // {
  //   path: 'pagina2',
  //   loadChildren: () => import('./pagina2/pagina2.module').then( m => m.Pagina2PageModule)
  // },
     {
    path: 'car',
    loadChildren: () => import('./car/car.module').then( m => m.CarPageModule)
  },
  {
    path: 'cart-modal',
    loadChildren: () => import('./cart-modal/cart-modal.module').then( m => m.CartModalPageModule)
  },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
