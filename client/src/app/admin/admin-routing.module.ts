import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from '../utilities/guards/role.guard';

import { ProductsComponent } from '../products/components/root/root.component';
import { CategoriesResolver } from '../utilities/resolvers/categories-resolver.service';
import { PaginationResolver } from '../utilities/resolvers/pagination-resolver.service';


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
          pagination: PaginationResolver,
        },
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
