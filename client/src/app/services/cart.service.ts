import { Injectable } from '@angular/core';

export interface Cart {
  _id: string,
  isActive: boolean,
  createDate: Date
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
}
