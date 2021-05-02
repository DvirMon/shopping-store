//ANGULAR CORE
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { RootComponent } from './components/root/root.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// RESOLVER
import { InfoResolver } from './utilities/resolvers/info-resolver.service';

// GUARDS
import { AuthGuard } from './utilities/guards/auth.guard';
import { CategoriesResolver } from './utilities/resolvers/categories-resolver.service';
import { PaginationResolver } from './utilities/resolvers/pagination-resolver.service';
import { RoleGuard } from './utilities/guards/role.guard';

const routes: Routes = [

  {
    path: "",
    component: RootComponent
  },

  {
    path: "home/:userId/products/:alias/:categoryId",
    canActivate: [AuthGuard],
    resolve: { info: InfoResolver },
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
  },

  // LOGIN
  {
    path: "auth",
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  // ADMIN MODULE
  {
    path: "admin/products/:alias/:categoryId",
    canActivate: [RoleGuard],
    resolve: {
      categories: CategoriesResolver,
      pagination: PaginationResolver,
    },
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
  },

  // PRODUCTS MODULE
  {
    path: "products/:alias/:categoryId",
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
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



