import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderModel } from '../models/order-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public baseUrl: string = "http://localhost:3000/api/orders/dates"

  constructor(
    private http: HttpClient
  ) { }


  public handleNewOrder(data: OrderModel) {
    this.http.post<OrderModel>(this.baseUrl, data)
  }

  public getOccupiedDates(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl)
  }


}
