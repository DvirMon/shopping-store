import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormService } from './form.service';

import { CartModel } from '../utilities/models/cart-model';
import { CartItemModel, CurrentItemModel } from '../utilities/models/cart-item-model';

import { map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { store } from '../utilities/redux/store';
// import { ActionType } from '../utilities/redux/action-type';


import { Store } from '@ngrx/store';
import { cartState } from '../utilities/ngrx/state/cart-state';
import * as  CartActions from "../utilities/ngrx/action";

import { environment } from 'src/environments/environment';
import { ActionType } from '../utilities/redux/action-type';
import { CartItemService } from './cart-item.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart$: Observable<CartModel> = this.ngrxStore.select('cart');

  private editCartState = new BehaviorSubject<boolean>(false);
  private editState$: Observable<boolean> = this.editCartState.asObservable()

  private url: string = `${environment.server}/api/carts`;

  constructor(
    private http: HttpClient,
    private ngrxStore: Store<{ cart: typeof cartState }>,
    private formService : FormService,
    private cartItemService : CartItemService
  ) { }


  // GETTER SECTION


  public getEditState() {
    return this.editState$
  }

  // HTTP SECTION

  // GET request - latest cart : http://localhost:3000/api/carts/latest/:cartId"
  public getLatestCart(userId): Observable<CartModel> {
    return this.http.get<CartModel>(this.url + `/latest/${userId}`).pipe(
      take(1),
      switchMap((payload: CartModel) => {


        if (!payload) {
          const cart = new CartModel()
          return of(cart)
        }

        const cart = CartModel.create(payload)
        if (cart.getIsActive()) {
          // get cart items
          return this.cartItemService.getCurentCartItems(cart)
        }

        return of(cart)
      }))
  }

  // GET request - create new cart : http://localhost:3000/api/carts"

  private tempCart(): Observable<CartModel> {
    return this.http.get<CartModel>(this.url)
  }

  // POST request - create new cart with user : http://localhost:3000/api/carts"
  private userCart(userId: string): Observable<CartModel> {
    return this.http.post<CartModel>(this.url, { userId })
  }

  // PATCH request - change cart status : http://localhost:3000/api/carts/:cartId"
  public deactivateCart(cartId: string): Observable<Object> {
    return this.http.patch(this.url + `/${cartId}`, { isActive: false })
  }


  // ----------------------------------------------------------------------------------//

  // DELETE request -delete cart and cart item : http://localhost:3000/api/carts/:_id"
  public deleteCartAndCartItems(_id) {
    this.http.delete(this.url + `/${_id}`).subscribe(
      () => {
        this.ngrxStore.dispatch(new CartActions.DeleteCart())
      }
    )
  }


  // LOIGC SECTION

  // main method for new cart
  public createCart(cartItem: CartItemModel): Observable<CurrentItemModel> {

    const user = store.getState().auth.user

    return (user
      ? this.userCart(user._id)
      : this.tempCart()
    ).pipe(
      switchMap((cart: CartModel) => {
        return this.createCartLogic(cart, cartItem)
      }))
  }


  private createCartLogic(cart, cartItem): Observable<CurrentItemModel> {
    const cartModel = CartModel.create(cart)
    this.ngrxStore.dispatch(new CartActions.AddCart(cart))
    cartItem.cartId = cartModel.get_id()
    return this.cartItemService.addCartItem(cartItem)
  }



  public emitEditState(state: boolean) {
    this.editCartState.next(state);
  }


}
//
