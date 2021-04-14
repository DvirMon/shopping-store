//ANGULAR CORE
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
// import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './components/home/home.component';
// import { RegisterComponent } from './auth/components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// RESOLVER
import { InfoResolver } from './utilities/resolvers/info-resolver.service';

// GUARDS
import { AuthGuard } from './utilities/guards/auth.guard';

const routes: Routes = [

  {
    path: "",
    component: HomeComponent
  },

  {
    path: "home/:userId",
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: { info: InfoResolver }
  },

  // LOGIN
  {
    path: "auth",
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  // REGISTER
  {
    path: "auth",
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  // {
  //   path: "register",
  //   component: RegisterComponent,
  // },

  // ADMIN MODULE
  {
    path: "admin",
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  // PRODUCTS MODULE
  {
    path: "products/:alias/:categoryId",
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },

  // ORDER MODULE
  {
    path: "order/:userId/:cartId",
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



