import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { ProductModel } from 'src/app/utilities/models/product-model';
import { DataTableService } from 'src/app/utilities/services/data-table.service';
import { tap } from 'rxjs/operators';
import { PaginationService } from 'src/app/utilities/services/pagination.service';
import { PaginationModel } from 'src/app/utilities/models/pagination-model';

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

  // public pagination: PaginationModel = new PaginationModel(0, 10, 10, 45)


  constructor
    (
      public dataTableService: DataTableService,
      public pagination: PaginationModel

    ) { }

  ngOnInit() {
    this.dataSource = this.dataTableService
    this.dataSource.loadProducts(1, 10)
  }

  ngAfterViewInit() {
    this.invokeTableProp()
    this.subscribeToPaginator()
    console.log(this.dataSource.data)
  }


  private subscribeToPaginator() {
    this.paginator.page.pipe(
      tap(() => this.getProductsPagination())
    ).subscribe()
  }
  
  // end if subscription
  
  
  private getProductsPagination() {
    this.dataSource.loadProducts((this.paginator.pageIndex + 1), this.paginator.pageSize)
    console.log(this.dataSource.data)
  }

  private invokeTableProp() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue) {
      this.dataTableService.loadFilterProducts(filterValue.trim().toLowerCase(), this.filterInput.nativeElement)
    }
  }
}
