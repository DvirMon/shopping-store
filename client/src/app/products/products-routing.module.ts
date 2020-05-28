import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './components/products/products.component';
import { ProductsResolver } from '../utilities/resolvers/products-resolver.service';
import { ProductsGuard } from '../utilities/guards/products.guard';


const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
    canActivate: [ProductsGuard],
    resolve: { categories: ProductsResolver }
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
