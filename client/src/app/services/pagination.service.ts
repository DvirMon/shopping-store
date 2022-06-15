import { Injectable } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { PaginationModel } from '../utilities/models/pagination-model';
import { ProductModel } from '../products/product-model';

import { FormService } from './form.service';

import { ActionType } from '../utilities/redux/action-type';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductsState } from '../utilities/ngrx/state/products-state';
import { ProductsService } from '../products/products.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  public scrollToTop = new BehaviorSubject<boolean>(false)

  private products$: Observable<ProductModel[]>

  private products: ProductModel[]

  constructor(
    private formService: FormService,
    private productsService : ProductsService
    // private store: Store<{ products: ProductsState }>
  ) {


  }

  public getCurrentPage() {

  }

  public getPagedData(data: ProductModel[], paginator: PaginationModel | MatPaginator): ProductModel[] {
    const startIndex = paginator.pageIndex * paginator.pageSize;
    return data.splice(startIndex, paginator.pageSize)
  }


  public getSortedData(alias: string, sort: MatSort) {

    const data: ProductModel[] = []

    if (!sort.active || sort.direction === '') {
      return data;
    }

    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'price': return this.compare(+a.price, +b.price, isAsc);
        default: return 0;
      }
    });

    // this.formService.handleStore(ActionType.SetProducts, { alias, products: sortedData })

  }

  private compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

