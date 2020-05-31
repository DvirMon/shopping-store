import { NgModule } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../share-components/shared-components.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminProductsTableComponent } from './components/admin-products-table/admin-products-table.component';
import { AdminProductsFormComponent } from './components/admin-products-form/admin-products-form.component';
import { MyTableComponent } from './components/my-table/my-table.component';
import { ProductsModule } from '../products/products.module';

 


@NgModule({
  declarations: [
    AdminProductsTableComponent,
    AdminProductsFormComponent,
    MyTableComponent],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
    AdminRoutingModule,
    ProductsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
  ]
})
export class AdminModule { }
