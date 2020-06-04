import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductsService } from 'src/app/utilities/services/products.service';
import { ActivatedRoute, Data } from '@angular/router';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { store } from 'src/app/utilities/redux/store';
import { MatPaginator } from '@angular/material/paginator';
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
  punl


  public pagination = {
    pageIndex: 0,
    pageSize: 8,
    pageSizeOptions: [8],
    length: 0
  }

  constructor(

    private productService: ProductsService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscribeToRoute()
    this.subscribeToStore()
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap(() => this.getProductsPagination())
    ).subscribe()
    this.getProductsPagination()
  }


  // subscription section

  private subscribeToStore() {
    store.subscribe(
      () => {
        this.collection = this.formatCollection()
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
      this.updateLength(data.products.docs)
      this.collection = this.productService.formatProductsArray(data.products.docs)
      this.pagination.length = data.products.totalDocs
    });
  }

  private getProductsPagination() {
    this.productService.getProductsPagination(
      this.categoryId,
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize,
      this.alias
    ).subscribe(
      (data) => this.collection = this.productService.formatProductsArray(data['docs']))
  }


  // end of subscription section

  private formatCollection(): [ProductModel[]] {
    const products = store.getState().products[this.alias];
    this.updateLength(products)
    return this.productService.formatProductsArray(products);
  }

  private updateLength(products) {
    this.pagination.length = products.length
  }

}
