import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from '../utilities/guards/role.guard';
import { AdminProductsTableComponent } from './components/admin-products-table/admin-products-table.component';
import { AdminProductsFormComponent } from './components/admin-products-form/admin-products-form.component';

import { ProductsComponent } from '../products/components/products/products.component';
import { CategoriesResolver } from '../utilities/resolvers/categories-resolver.service';
import { ProductsResolver } from '../utilities/resolvers/products-resolver.service';


const routes: Routes = [
  {
    path: "",
    canActivate: [RoleGuard],
    children: [
      {
        path: "products/:alias/:categoryId",
        component: ProductsComponent,
        resolve: {
          categories: CategoriesResolver,
          products: ProductsResolver,
        },
      },
      { path: "products-table", component: AdminProductsTableComponent },
      { path: "products-form", component: AdminProductsFormComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
