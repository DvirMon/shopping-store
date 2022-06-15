import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ProductModel } from 'src/app/products/product-model';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { PaginationModel, PageModel } from 'src/app/utilities/models/pagination-model';

import { ProductsService } from 'src/app/products/products.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { AuthService } from 'src/app/auth/auth.service';


import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ProductsState } from 'src/app/utilities/ngrx/state/products-state';

@Component({
  selector: 'app-products-dashbord',
  templateUrl: './products-dashbord.component.html',
  styleUrls: ['./products-dashbord.component.scss']
})
export class ProductsDashbordComponent implements OnInit, OnDestroy {

  private subscribeToPage: Subscription

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public products$: Observable<ProductsState>
  private products: ProductsState

  public isAdmin: boolean = this.authService.auth.user.isAdmin
  public isMobile$: Observable<boolean> = this.productService.isMobile();
  public searchMode: boolean = false

  public categories: CategoryModel[] = []
  public pages: PageModel[] = [];
  public currentPage: PageModel = new PageModel()

  public alias: string;

  private categoryId: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private productService: ProductsService,
    private paginationService: PaginationService,
  ) {

    this.products$ = this.productService.products$
  }

  ngOnInit(): void {
    this.subscribeToParams()
    this.subscribeToProducts()
    this.subscribeToData();

  }

  ngAfterViewInit(): void {
    this.subscribeToPaginator();
  }

  ngOnDestroy(): void {
    this.subscribeToPage.unsubscribe()
  }


  // SUBSCTIPTION SECTION

  // subscribe to sotre
  private subscribeToProducts() {
    this.products$.subscribe(
      (products) => {
        this.products = products
        this.pages = [...products[this.alias]]

        if (this.paginator && this.pages.length > 0) {
          this.currentPage = this.pages[this.paginator.pageIndex]
        }
      }
    )
  }


  // sucscrube to router
  private subscribeToParams(): void {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.setParams(params)
      }
      );
    }
    // sucscrube to data
  private subscribeToData(): void {
    this.activeRoute.params.subscribe(
      () => {
        this.getFirstPage()
      }
    );
  }

  // set params info
  private setParams(params: Params) {
    this.categoryId = params.categoryId;
    this.alias = params.alias;
    this.productService.handleCateogryAlias.next(this.alias)
  }

  // sucscrube to paginator
  private subscribeToPaginator(): void {

    if (this.paginator) {
      this.subscribeToPage = this.paginator?.page.pipe(
        tap((page) => {
          return this.handleProductsSource()
        })).subscribe()
    }
  }


  // ----------------------------------------------------------------------------------

  // HTTTP SECTION

  private getFirstPage() {

    this.paginator ? this.paginator.firstPage() : ""

    const pages: PageModel[] = this.products[this.alias]

    pages.length > 0
      ? this.currentPage = pages[0]
      : this.productService.getFirstPage(this.categoryId, this.alias)

  }


  // get products form store or server
  private handleProductsSource(): void {

    const currentPage: PageModel = this.products[this.alias][this.paginator.pageIndex]

    currentPage

      // store products
      ? this.currentPage = currentPage

      :// server products
      this.productService.addProductsPage(
        {
          page: (this.paginator.pageIndex + 1),
          limit: this.paginator.pageSize,
        },
        this.categoryId,
        this.alias
      )
  }


  //---------------------------------------------------------------------------------------------------------------------

  // LOGIC SECTION


  // SIDENAV LOGIC SECTION

  // handle
  public handleMode(event: boolean) {
    this.searchMode = event
  }

  //
  public onCloseStart() {
    this.searchMode = false
  }



}
