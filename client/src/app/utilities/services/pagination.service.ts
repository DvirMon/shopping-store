import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product-model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductsService } from './products.service';
import { PaginationModel } from '../models/pagination-model';
import { store } from '../redux/store';
import { FormService } from './form.service';
import { ActionType } from '../redux/action-type';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {


  constructor(
    private productService: ProductsService,
    private formService: FormService
  ) {
  }

  public getPagedData(data: ProductModel[], paginator: PaginationModel | MatPaginator, cols: number) {
    const startIndex = paginator.pageIndex * paginator.pageSize;
    const products = data.splice(startIndex, paginator.pageSize)
    return this.productService.formatProductsArray(products, cols)
  }


  public getSortedData(alias: string, sort: MatSort) {

    const data: ProductModel[] = store.getState().products[alias].products

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

    this.formService.handleStore(ActionType.SetProducts, { alias, products: sortedData })

  }

  private compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

