import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from '../utilities/guards/role.guard';
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
        component: MenuDashbordComponent,
      },
      {
        path: "products",
        loadChildren: () => import('../products/products.module').then(m => m.ProductsModule),
      },


      // PRODUCTS MODULE
      {
        path: "products/admin/:alias/:categoryId",
        canActivate: [RoleGuard],
        loadChildren: () => import('../products/products.module').then(m => m.ProductsModule),
      },

      // ORDER MODULE
      {
        path: "order/:userId/:cartId",
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
