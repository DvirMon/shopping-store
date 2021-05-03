import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORT COMPONENTS
import { RootComponent } from './components/root/root.component';

// IMPORT GUARD
import { ProductsGuard } from '../utilities/guards/products.guard';

// IMPORT RESOLVERS
import { CategoriesResolver } from '../utilities/resolvers/categories-resolver.service';
import { PaginationResolver } from '../utilities/resolvers/pagination-resolver.service';
import { ProductsMenuComponent } from './components/products-menu/products-menu.component';
import { ProductsDashbordComponent } from './components/products-dashbord/products-dashbord.component';


const routes: Routes = [
  {
    path: "",
    // canActivate: [ProductsGuard],
    component: RootComponent,
    resolve: {
      categories: CategoriesResolver,
    },
    children: [
      {
        path: "categories",
        component: ProductsMenuComponent
      },
      {
        path: ":userId/:alias/:categoryId",
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
