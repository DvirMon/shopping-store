import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORT COMPONENTS
import { RootComponent } from './components/root/root.component';

// IMPORT GUARD

// IMPORT RESOLVERS
import { ProductsDashboardComponent } from './components/products-dashbord/products-dashbord.component';
import { ProductsGuard } from 'src/app/utilities/guards/products.guard';
import { PaginationResolver } from 'src/app/utilities/resolvers/pagination-resolver.service';


const routes: Routes = [
  {
    path: "",

    component: RootComponent,
    children: [
      {
        path: "categories/:alias/:categoryId",
        resolve: {
          // pagination: PaginationResolver,

        },
        component: ProductsDashboardComponent
      },
      {
        path: ":userId/:alias/:categoryId",
        canActivate: [ProductsGuard],
        resolve: {
          pagination: PaginationResolver,
        },
        component: ProductsDashboardComponent
      }
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
