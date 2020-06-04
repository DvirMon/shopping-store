import { Injectable } from '@angular/core';
import { FormService } from './form.service';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from './products.service';
import { ActionType } from '../redux/action-type';
import { ProductModel } from '../models/product-model';
import { Observable } from 'rxjs';

import { config } from '../../../main-config'
import { map, findIndex } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public baseUrl: string = `http://localhost:${config.port}/api/products`

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
