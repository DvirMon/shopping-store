import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../utilities/guards/auth.guard';
import { ProductsGuard } from '../utilities/guards/products.guard';
import { RoleGuard } from '../utilities/guards/role.guard';
import { CartResolver } from '../utilities/resolvers/cart-resolver.service';
import { CategoriesResolver } from '../utilities/resolvers/categories-resolver.service';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { MenuDashbordComponent } from './components/menu-dashbord/menu-dashbord.component';

// COMPONENTS
import { RootComponent } from './components/root/root.component';

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
        component: MenuDashbordComponent,
      },
      {
        path: "account",
        component: AccountComponent
      },
      {
        path: "cart",
        component: CartComponent
      },
      {
        path: "products",
        canActivate: [ProductsGuard],
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
