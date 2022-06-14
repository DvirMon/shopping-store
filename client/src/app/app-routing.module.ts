//ANGULAR CORE
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { RootComponent } from './components/root/root.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [

  {
    path: "",
    component: RootComponent
  },
  // LOGIN
  {
    path: "auth",
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)
  },

  // REDIRECT TO HOME PAGE
  {
    path: "",
    redirectTo: "/",
    pathMatch: 'full'
  },

  // HANDLE PAGE-NOT-FOUND
  {
    path: "**",
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }



