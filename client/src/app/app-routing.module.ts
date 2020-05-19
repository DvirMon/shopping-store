import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { InfoResolver } from './resolvers/info-resolver.service';


const routes: Routes = [
  { path: "login", component: HomeComponent },
  {
    path: "home/:userId",
    component: HomeComponent,
    canActivate: [AuthGuard], 
    resolve: { info: InfoResolver }
  },
  {
    path: "register", component: RegisterComponent,

  },
  { path: "admin", loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: "products/:categoryId", loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: "order/:cartId", loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
  { path: "", redirectTo: "/login", pathMatch: 'full' },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
