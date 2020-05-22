import { Injectable } from '@angular/core';

export interface Order {
  userId: string,
  cartId: string,
  shipmentDate: Date,
  orderDate: Date,
  totalPrice: number,
  creditCard: string
  city: string
  street: string
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
}
