import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../main-config'
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product-model';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ProductsDialogComponent } from '../products/components/products-dialog/products-dialog.component';
import { FormControl } from '@angular/forms';


export interface Category {
  _id: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  public baseUrl: string = `http://localhost:${config.port}/api/products`

  constructor(
    private http: HttpClient,
    public productDialog: MatDialog


  ) { }

  public getProductsCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + "/auth/categories")
  }

  public getProductsByCategory(categoryId): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl + `/auth/category/${categoryId}`).pipe(
      map(response => {
        const collection = []
        const temp = [...response]
        for (let i = 0; i <= response.length;) {
          const row: ProductModel[] = temp.splice(0, 4)
          collection.push(row)
          i = i + 4
        }
        return collection
      })
    )
  }

  public searchProducts(value: string) {
    return this.http.get(this.baseUrl + `/auth/search/${value}`)
  }

  // end of requests section

  // dialog section

  public handleProductDialog() {
    this.productDialog.open(ProductsDialogComponent)
  }
}
