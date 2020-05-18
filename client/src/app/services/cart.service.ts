import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormService } from './form.service';
import { ActionType } from '../redux/action-type';
import { CartModel } from '../models/cart-model';
import { store } from '../redux/store';
import { CartItemModel } from '../models/cart-item-model';
import { switchMap, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CartService {


  public baseUrl = "http://localhost:3000/api/carts"

  constructor(
    private http: HttpClient,
    private formService: FormService
  ) { }

  // request section
  public getNewCart(cartItem: CartItemModel) {
    const userId = store.getState().auth.user._id
    this.http.post<CartModel>(this.baseUrl, { userId }).pipe(
      switchMap(cart => {
        this.formService.handleStore(ActionType.AddCart, cart)
        cartItem.cartId = cart._id
        return this.http.post("http://localhost:3000/api/cart-item", cartItem)
      })).subscribe(
        (cartItem: CartItemModel) => {
          this.formService.handleStore(ActionType.AddCartItem, cartItem)
        }
      )
  }

  public addCartItem(cartItem: CartItemModel) {
    this.http.post("http://localhost:3000/api/cart-item", cartItem).subscribe(
      (cartItem) => this.formService.handleStore(ActionType.AddCartItem, cartItem)
    )
  }

  // end of cart section


  //logic action section

}
