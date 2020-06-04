import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { ProductModel } from 'src/app/utilities/models/product-model';
import { DataTableService } from 'src/app/utilities/services/data-table.service';

@Component({
  selector: 'app-admin-products-table',
  templateUrl: './admin-products-table.component.html',
  styleUrls: ['./admin-products-table.component.scss']
})
export class AdminProductsTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProductModel>;
  @ViewChild('filterInput') filterInput: ElementRef<HTMLInputElement>;


  public dataSource: DataTableService;

  public displayedColumns: string[] = ['check', '_id', 'name', 'category', 'price', 'edit'];

  public pagination = {
    pageIndex: 0,
    pageSize: 10,
    pageSizeOptions: [10]
  }

  constructor
    (
      public dataTableService: DataTableService

    ) { }

  ngOnInit() {
    this.dataSource = this.dataTableService
    this.dataSource.loadProducts()
  }

  ngAfterViewInit() {
    this.invokeTableProp()
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue) {
      this.dataTableService.loadFilterProducts(filterValue.trim().toLowerCase(), this.filterInput.nativeElement)
    }
  }

  private invokeTableProp() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
