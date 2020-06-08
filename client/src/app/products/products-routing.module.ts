import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './components/products/products.component';
import { CategoriesResolver } from '../utilities/resolvers/categories-resolver.service';
import { ProductsGuard } from '../utilities/guards/products.guard';
import {  PaginationResolver } from '../utilities/resolvers/pagination-resolver.service';


const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
    canActivate: [ProductsGuard],
    resolve: {
      categories: CategoriesResolver,
      pagination:  PaginationResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
