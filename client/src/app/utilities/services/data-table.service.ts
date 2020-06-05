import { Injectable, Inject } from '@angular/core';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, catchError } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { AdminService } from 'src/app/utilities/services/admin.service';
import { ProductsService } from './products.service';
import { PaginationService } from './pagination.service';
import { ProductsModule } from 'src/app/products/products.module';
import { store } from '../redux/store';
import { PaginationDataModel } from '../models/pagination-model';

@Injectable({
  providedIn: 'root'
})

export class DataTableService extends DataSource<ProductModel>{

  public productsSubject = new BehaviorSubject<ProductModel[]>([]);

  public data: ProductModel[] = [];
  public sort: MatSort
  public paginator: MatPaginator

  constructor(
    private productsService: ProductsService,
    private paginationService: PaginationService

  ) {
    super();
  }

  public connect(collectionViewer?: CollectionViewer): Observable<ProductModel[]> {

    const dataMutations = [
      this.productsSubject.asObservable(),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.paginationService.getPagedData(this.getData(), this.paginator);
    }));
  }

  public disconnect() {
    // this.productsSubject.complete()
  }

  public loadProducts(page: number, limit: number) {

    this.productsService.getProductsPagination(page, limit)
      .subscribe(
        (data) => {
          this.data = data.products,
            this.paginator.pageSizeOptions = [10],
            this.paginator.pageSize = limit,
            this.paginator.pageIndex = data.pagination.pageIndex,
            this.paginator.length = data.pagination.length,
            this.productsSubject.next(data.products)
        }
      ),
      (err) => console.log(err),
      () => this.productsSubject.next(this.data)
  }

  public loadFilterProducts(filterValue: string, input: HTMLInputElement) {
    this.productsService.searchProducts(filterValue).subscribe(
      (products) => {
        for (const key in products) {
          products[key]._id = (parseInt(key) + 1).toString()
        }
        this.data = products
        this.productsSubject.next(products)
      },
      (err) => console.log(err),
      () => input.focus()
    )
  }

  private getData(): ProductsModule[] {
    return this.paginationService.getSortedData([...this.data], this.sort);
  }

}
