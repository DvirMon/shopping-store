import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product-model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public baseUrl: string = `${environment.server}/api/products`

  constructor(
    private http: HttpClient,

  ) { }

  public getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl).pipe(
      map(products => {
        for (const key in products) {
          products[key]._id = (parseInt(key) + 1).toString()
        }
        return products
      })
    )
  }

}
