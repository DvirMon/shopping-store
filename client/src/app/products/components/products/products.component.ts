import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Data } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';

import { ProductModel } from 'src/app/utilities/models/product-model';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { PaginationModel, PaginationDataModel } from 'src/app/utilities/models/pagination-model';

import { PaginationService } from 'src/app/services/pagination.service';

import { tap } from 'rxjs/operators';

import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public categories: CategoryModel[] = []
  public products: ProductModel[] = []
  public searchEntries: ProductModel[] = [];
  public paginationData: PaginationDataModel;

  public cartOpen: boolean = true;
  public isAdmin: boolean = false
  public categoryId: string
  public alias: string

  constructor(
    private productService: ProductsService,
    private paginationService: PaginationService,
    public pagination: PaginationModel,
    private activeRoute: ActivatedRoute,
  ) { }

  // public mobile = this

  ngOnInit(): void {
    this.subscribeToRoute();
    this.subscribeToStore();
    this.subscribeToeDrawerToggle();
    this.subscribeToSearchResults();

  }

  ngAfterViewInit(): void {
    this.subscribeToPaginator();
  }


  // subscription section

  private subscribeToStore(): void {
    store.subscribe(
      () => {
        this.products = this.getPageProducts();
        this.isAdmin = store.getState().auth.isAdmin;
        this.paginationData = store.getState().products[this.alias];
      });
    this.isAdmin = store.getState().auth.isAdmin;
  }

  // handle route subscription
  private subscribeToRoute(): void {
    this.getData();
    this.getParams();

  }

  // get params info
  private getParams(): void {
    this.activeRoute.params.subscribe(
      (params) => {
        this.categoryId = params.categoryId;
        this.alias = params.alias;
        this.paginationData = store.getState().products[this.alias];
      }
    );
  }

  // get products info
  private getData(): void {
    this.activeRoute.data.subscribe((data: Data) => {
      this.products = data.pagination.products;
      this.pagination = data.pagination.pagination;
      if (this.paginator) {
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

  private subscribeToeDrawerToggle(): void {
    this.productService.handleDrawerToggle.subscribe(
      (value) => this.handleGridSize(value)

    )
  }

  private subscribeToSearchResults() {
    this.productService.handleSearchEntries.subscribe(
      (searchEntries: ProductModel[]) => {
        this.searchEntries = searchEntries
      }
    )
  }

  // end of subscription section

  // request section

  // get products with page data
  private getProductsPagination(): void {
    this.productService.getProductsPagination(
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize,
      this.categoryId,
      this.alias
    ).subscribe(
      (data) => {
        this.products = data.products
      })
  }

  // get products form store or server
  private handleProductsSource(): void {

    if (this.isPageExist()) {
      this.products = this.getPageProducts()

    } else {
      this.getProductsPagination()
    }
  }

  // end of request section

  // logic section

  // valid if products page are already in store
  private isPageExist(): boolean {
    const page = this.paginationData.pages.find(page => page === this.paginator.pageIndex)
    if (page === 0) {
      return !page
    }
    return !!page
  }

  // get products as page products
  private getPageProducts(): ProductModel[] {
    const pagination = this.paginator ? this.paginator : this.pagination
    const products = store.getState().products[this.alias].products
    return this.paginationService.getPagedData([...products], pagination)
  }

  // handle products grid size
  private handleGridSize(value: boolean): void {

    this.cartOpen = value

    value
    ? this.paginator.pageSize = 6
    : this.paginator.pageSize = 8

    this.products = this.getPageProducts()
  }

}
