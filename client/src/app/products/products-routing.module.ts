import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORT COMPONENTS
import { RootComponent } from './components/root/root.component';

// IMPORT GUARD
import { ProductsGuard } from '../utilities/guards/products.guard';

// IMPORT RESOLVERS
import { CategoriesResolver } from '../utilities/resolvers/categories-resolver.service';
import { PaginationResolver } from '../utilities/resolvers/pagination-resolver.service';


const routes: Routes = [
  {
    path: "",
    canActivate: [ProductsGuard],
    resolve: {
      categories: CategoriesResolver,
      pagination: PaginationResolver,
    },
    component: RootComponent

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
