import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product-model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {


  constructor(
    private productService: ProductsService
  ) {
  }

  public getPagedData(data: ProductModel[], paginator: MatPaginator) {
    const startIndex = paginator.pageIndex * paginator.pageSize;
    return this.productService.formatProductsArray(data.splice(startIndex, paginator.pageSize))
  } 


  // public getSortedData(data: ProductModel[], sort: MatSort): ProductModel[] {

  //   if (!sort.active || sort.direction === '') {
  //     return data;
  //   }

  //   return data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'name': return this.compare(a.name, b.name, isAsc);
  //       case '_id': return this.compare(+a._id, +b._id, isAsc);
  //       case 'price': return this.compare(+a.price, +b.price, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

  // private compare(a: string | number, b: string | number, isAsc: boolean) {
  //   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  // }
}

