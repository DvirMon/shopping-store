//ANGULAR CORE
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { RootComponent } from './components/root/root.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsCategoriesComponent } from './share-components/components/products-categories/products-categories.component';

// RESOLVER
import { InfoResolver } from './utilities/resolvers/info-resolver.service';
import { CategoriesResolver } from './utilities/resolvers/categories-resolver.service';
import { PaginationResolver } from './utilities/resolvers/pagination-resolver.service';

// GUARDS
import { AuthGuard } from './utilities/guards/auth.guard';
import { RoleGuard } from './utilities/guards/role.guard';



const routes: Routes = [

  {
    path: "",
    component: RootComponent
  },
  // LOGIN
  {
    path: "auth",
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "products",
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
  },


  // PRODUCTS MODULE
  {
    path: "products/admin/:alias/:categoryId",
    canActivate: [RoleGuard],
    resolve: {
      pagination: PaginationResolver,
    },
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
  },

  // ORDER MODULE
  {
    path: "order/:userId/:cartId",
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
  },

  // REDIRECT TO HOME PAGE
  {
    path: "",
    redirectTo: "/",
    pathMatch: 'full'
  },

  // HANDLE PAGE-NOT-FOUND
  {
    path: "**",
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }



