import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../main-config'
import { Observable } from 'rxjs';


export interface Category {
  _id : string,
  name : string
}

export interface Product {
  _id : string,
  name : string,
  price : number,
  categoryId : string,
  imagePath : string,
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public baseUrl: string = `http://localhost:${config.port}/api/products`

  constructor(
    private http: HttpClient
  ) { }

  public getProductsCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + "/categories")
  }

  public getProductsByCategory(categoryId) : Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + `/category/${categoryId}`)
  }
}
