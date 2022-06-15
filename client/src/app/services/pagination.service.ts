import { Injectable } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductModel } from '../feat-modules/products/product-model';
import { PaginationModel } from '../utilities/models/pagination-model';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  public scrollToTop = new BehaviorSubject<boolean>(false)


  constructor(
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

