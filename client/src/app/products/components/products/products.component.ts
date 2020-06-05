import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductsService } from 'src/app/utilities/services/products.service';
import { ActivatedRoute, Data } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

import { ProductModel } from 'src/app/utilities/models/product-model';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { PaginationModel } from 'src/app/utilities/models/pagination-model';
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
        // this.collection = this.formatCollection()
        this.isAdmin = store.getState().auth.isAdmin
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
      tap(() => this.getProductsPagination())
    ).subscribe()
  }

  // end of subscription section

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

  private formatCollection(): [ProductModel[]] {
    const products = store.getState().products[this.alias];
    return this.productService.formatProductsArray(products);
  }


}
