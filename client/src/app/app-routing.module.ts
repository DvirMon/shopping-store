import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: "home" , component : HomeComponent},
  { path: "register", component: RegisterComponent },
  { path: "admin", loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, 
  { path: "products", loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: "", redirectTo: "/home", pathMatch: 'full' },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
