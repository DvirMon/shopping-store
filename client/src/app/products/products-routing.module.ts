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
import { AuthGuard } from '../utilities/guards/auth.guard';
import { CartResolver } from '../utilities/resolvers/cart-resolver.service';


const routes: Routes = [
  {
    path: "",
    // canActivate: [ProductsGuard],
    resolve: {
      categories: CategoriesResolver,
    },
    component: RootComponent,
    children: [
      {
        path: ":userId/:alias/:categoryId",
        canActivate: [AuthGuard, ProductsGuard],
        resolve: {
          pagination: PaginationResolver,
          cart: CartResolver

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
