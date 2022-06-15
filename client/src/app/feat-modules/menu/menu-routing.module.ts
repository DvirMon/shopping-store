import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { RootComponent } from './components/root/root.component';
import { MenuDashboardComponent } from './components/menu-dashbord/menu-dashbord.component';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/menu-cart/cart.component';
import { AccountGuard } from 'src/app/utilities/guards/account.guard';

import { AuthGuard } from 'src/app/utilities/guards/auth.guard';
import { OrderGuard } from 'src/app/utilities/guards/order.guard';
import { RoleGuard } from 'src/app/utilities/guards/role.guard';
import { CartResolver } from 'src/app/utilities/resolvers/cart-resolver.service';
import { CategoriesResolver } from 'src/app/utilities/resolvers/categories-resolver.service';


const routes: Routes = [

  {
    path: "",
    component: RootComponent,
    children: [
      {
        path: "",
        canActivate: [AuthGuard],
        resolve: {
          categories: CategoriesResolver,
          cart: CartResolver
        },
        component: MenuDashboardComponent,
      },
      {
        path: "account",
        canActivate: [AccountGuard],
        component: AccountComponent
      },
      {
        path: "cart",
        component: CartComponent
      },
      {
        path: "products",
        loadChildren: () => import('../products/products.module').then(m => m.ProductsModule),
      },


      // ADMIN MODULE
      {
        path: "products/admin/:alias/:categoryId",
        canActivate: [RoleGuard],
        loadChildren: () => import('../products/products.module').then(m => m.ProductsModule),
      },

      // ORDER MODULE
      {
        path: "order",
        canActivate: [OrderGuard],
        loadChildren: () => import('../order/order.module').then(m => m.OrderModule)
      },


    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
