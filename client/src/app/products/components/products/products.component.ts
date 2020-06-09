import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductsService } from 'src/app/utilities/services/products.service';
import { ActivatedRoute, Data } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

import { ProductModel } from 'src/app/utilities/models/product-model';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { PaginationModel, PaginationDataModel } from 'src/app/utilities/models/pagination-model';
import { PaginationService } from 'src/app/utilities/services/pagination.service';

import { store } from 'src/app/utilities/redux/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public categories: CategoryModel[] = []
  public collection: [ProductModel[]]

  public cols: number = 3;
  public isAdmin: boolean = false
  public categoryId: string
  public alias: string
  public paginationData: PaginationDataModel;



  constructor(
    private productService: ProductsService,
    private paginationService: PaginationService,
    public pagination: PaginationModel,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subscribeToRoute()
    this.subscribeToStore()
    this.subscribeToSubject()
  }

  ngAfterViewInit() {
    this.subscribeToPaginator()
    // this.paginator.pageIndex = this.pagination.pageIndex
    // console.log(this.paginator)
    // console.log(this.pagination)

  }


  // subscription section

  private subscribeToStore() {
    store.subscribe(
      () => {
        this.collection = this.getPageProducts()
        this.isAdmin = store.getState().auth.isAdmin
        this.paginationData = store.getState().products[this.alias]
      });
    this.isAdmin = store.getState().auth.isAdmin
  }

  private subscribeToRoute(): void {
    this.getData();
    this.getParams();

  }

  private getParams(): void {
    this.activeRoute.params.subscribe(
      (params) => {
        this.categoryId = params.categoryId; 
        this.alias = params.alias
        this.paginationData = store.getState().products[this.alias]
      }
    );
  }

  private getData(): void {
    this.activeRoute.data.subscribe((data: Data) => {
      this.collection = this.productService.formatProductsArray(data.pagination?.products, this.cols)
      this.pagination = data.pagination.pagination
      if (this.paginator) {
        // this.paginator.pageIndex = this.pagination.pageIndex
        this.paginator.firstPage();

      }
    });
  }

  private subscribeToPaginator(): void {
    this.paginator.page
      .pipe(
        tap(() => this.handleProductsSource()))
      .subscribe()
  }

  private subscribeToSubject(): void {
    this.productService.productsCols.subscribe(
      (value) => this.setGrid(value)

    )
  }

  // end of subscription section

  // request section
  private getProductsPagination(): void {
    this.productService.getProductsPagination(
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize,
      this.categoryId,
      this.alias
    ).subscribe(
      (data) => {
        this.collection = this.productService.formatProductsArray(data.products, this.cols)
        // this.pagination = data.pagination
      })
  }

  // get products form store or server
  private handleProductsSource(): void {

    console.log(1)
    if (this.isPageExist()) {

      this.collection = this.getPageProducts()
      // this.pagination = this.paginationData.pagination
      // this.handlePagination()

    } else {
      this.getProductsPagination()
    }
  }

  private handlePagination() {
    this.pagination.length = this.paginator.length
    this.pagination.pageIndex = this.paginator.pageIndex
    this.pagination.pageSize = this.paginator.pageSize
  }

  // end of request section

  // logic section

  private isPageExist(): boolean {
    const page = this.paginationData.pages.find(page => page === this.paginator.pageIndex)
    if (page === 0) {
      return !page
    }
    return !!page
  }


  private getPageProducts(): [ProductModel[]] {
    const pagination = this.paginator ? this.paginator : this.pagination
    const products = store.getState().products[this.alias].products
    return this.paginationService.getPagedData([...products], pagination, this.cols)
  }

  private setGrid(condition: boolean): void {
    if (condition) {
      this.cols = 3
      this.paginator.pageSize = 6
      this.collection = this.getPageProducts()
    }
    else {
      this.cols = 4
      this.paginator.pageSize = 8
      this.collection = this.getPageProducts()
    }
  }

}
