import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ProductModel } from 'src/app/utilities/models/product-model';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { PaginationModel, PaginationDataModel } from 'src/app/utilities/models/pagination-model';

import { ProductsService } from 'src/app/services/products.service';
import { PaginationService } from 'src/app/services/pagination.service';


import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { store } from 'src/app/utilities/redux/store';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products-dashbord',
  templateUrl: './products-dashbord.component.html',
  styleUrls: ['./products-dashbord.component.scss']
})
export class ProductsDashbordComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isAdmin: boolean = this.authService.auth.user.isAdmin
  public isMobile$: Observable<boolean> = this.productService.isMobile();
  public searchMode: boolean = false

  public categories: CategoryModel[] = []
  public products: ProductModel[] = []
  public paginationData: PaginationDataModel;
  public pagination: PaginationModel = new PaginationModel();

  private categoryId: string;
  private alias: string; 

  constructor(
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private productService: ProductsService,
    private paginationService: PaginationService,
  ) { }

  ngOnInit(): void {
    this.subscribeToRoute();
    this.subscribeToStore();
  }

  ngAfterViewInit(): void {
    this.subscribeToPaginator();
  }


  // SUBSCTIPTION SECTION

  private subscribeToStore(): void {
    store.subscribe(
      () => {
        this.products = this.getPageProducts();
        this.paginationData = store.getState().products[this.alias];
      });
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
        this.productService.handleCateogryAlias.next(this.alias)
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

  // sucscrube to paginator
  private subscribeToPaginator(): void {
    if (this.paginator) {
      this.paginator?.page
        .pipe(
          tap(() => this.handleProductsSource()))
        .subscribe()
    }
  }

  private subscribeToSort(): void {
    this.sort.sortChange.subscribe(
      (sort) => this.paginationService.getSortedData(this.alias, this.sort)
    )
  }

  // ----------------------------------------------------------------------------------

  // HTTTP SECTION

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

  //---------------------------------------------------------------------------------------------------------------------

  // LOGIC SECTION

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


  // SIDENAV LOGIC SECTION

  // handle
  public handleMode(event: boolean) {
    this.searchMode = event
  }

  //
  public onCloseStart() {
    console.log(1)
    this.searchMode = false
  }



}
