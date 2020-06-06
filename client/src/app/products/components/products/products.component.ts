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
  public isAdmin: boolean = false
  public categoryId: string
  public alias: string
  public paginationData: PaginationDataModel;



  constructor(
    private productService: ProductsService,
    private paginationService: PaginationService,
    private activeRoute: ActivatedRoute,
    public pagination: PaginationModel
  ) { }

  ngOnInit(): void {
    this.subscribeToRoute()
    this.subscribeToStore()
  }

  ngAfterViewInit() {
    this.subscribeToPaginator()
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
    this.paginationData = store.getState().products[this.alias]
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
      this.collection = this.productService.formatProductsArray(data.products.products)
      this.pagination = data.products.pagination
    });
  }

  private subscribeToPaginator() {
    this.paginator.page.pipe(
      tap(() => {
        if (this.isPageExist()) {
          this.collection = this.getPageProducts()
          this.pagination = this.paginationData.pagination
        } else {
          this.getProductsPagination()
        }

      }
      )).subscribe()
  }

  // end of subscription section

  // request section
  private getProductsPagination() {
    this.productService.getProductsPagination(
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize,
      this.categoryId,
      this.alias
    ).subscribe(
      (data) => {
        this.collection = this.productService.formatProductsArray(data.products)
        this.pagination = data.pagination
      })
  }
  // end of request section


  private formatCollection(products): [ProductModel[]] {
    return this.productService.formatProductsArray(products);
  }

  private isPageExist(): boolean {
    const page = this.paginationData.pages.find(page => page === this.paginator.pageIndex)
    if (page === 0) {
      return !page
    }
    return !!page
  }

  private getPageProducts(): [ProductModel[]] {
    return this.paginationService.getPagedData([...this.paginationData.products], this.paginator)
  }


}
