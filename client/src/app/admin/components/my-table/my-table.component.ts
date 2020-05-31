import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductTableDataSource } from './my-table-datasource';

import { AdminService } from 'src/app/utilities/services/admin.service';
import { ProductModel } from 'src/app/utilities/models/product-model';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProductModel>;

  public dataSource: ProductTableDataSource;
  public displayedColumns: string[] = ['check', '_id', 'name', 'category', 'price', 'edit'];

  constructor
    (
      private adminService: AdminService,
  ) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  ngOnInit() {
    this.dataSource = new ProductTableDataSource(this.adminService);
    this.dataSource.loadProducts()


  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
