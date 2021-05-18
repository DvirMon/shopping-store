import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORT COMPONENTS
import { RootComponent } from './components/root/root.component';

// IMPORT GUARD
import { ProductsGuard } from '../utilities/guards/products.guard';

// IMPORT RESOLVERS
import { CategoriesResolver } from '../utilities/resolvers/categories-resolver.service';
import { PaginationResolver } from '../utilities/resolvers/pagination-resolver.service';
import { ProductsDashbordComponent } from './components/products-dashbord/products-dashbord.component';


const routes: Routes = [
  {
    path: "",

    component: RootComponent,
    children: [
      {
        path: "categories/:alias/:categoryId",
        resolve: {
          pagination: PaginationResolver,

        },
        component: ProductsDashbordComponent
      },
      {
        path: ":userId/:alias/:categoryId",
        canActivate: [ProductsGuard],
        resolve: {
          pagination: PaginationResolver,
        },
        component: ProductsDashbordComponent
      }
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
