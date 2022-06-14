import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CartModel } from '../utilities/models/cart.model';

import { CartItemService } from './cart-item.service';

import { map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

// NGRX
import { Store } from '@ngrx/store';
import { cartSelector } from '../utilities/ngrx/selectors';
import { CartState } from '../utilities/ngrx/state/cart-state';
import * as  CartActions from "../utilities/ngrx/actions/cart-action";

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart$: Observable<CartModel> = this.store.select(cartSelector);

  private editCartState = new BehaviorSubject<boolean>(false);
  private editState$: Observable<boolean> = this.editCartState.asObservable()

  private url: string = `${environment.server}/api/carts`;

  constructor(
    private http: HttpClient,
    private store: Store<{ cart: CartState }>,
    private cartItemService: CartItemService
  ) { }


  // GETTER SECTION


  public getEditState() {
    return this.editState$
  }

  // HTTP SECTION

  // GET request - user cart : http://localhost:3000/api/carts/user/:userId"
  private getUserCart(userId): Observable<CartModel> {
    return this.http.get<CartModel>(this.url + `/user/${userId}`).pipe(
      map((cart: CartModel) => {

        if (cart) {
          return CartModel.create(cart)
        }
      }
      ))
  }

  // POST request - create new cart with user : http://localhost:3000/api/carts"
  private createCart(userId: string): Observable<CartModel> {

    return this.http.post<CartModel>(this.url, { userId }).pipe(
      map((cart: CartModel) => {
        return CartModel.create(cart)
      }
      ))
  }

  // PUT request - update temp cart with user : http://localhost:3000/api/carts"
  private updateUserCart(cart: CartModel) {
    return this.http.put<CartModel>(this.url, cart)

  }

  // PATCH request - change cart status : http://localhost:3000/api/carts/:cartId"
  public deactivateCart(cartId: string): Observable<Object> {
    return this.http.patch(this.url + `/${cartId}`, { isActive: false })
  }

  // DELETE request -delete cart and cart item : http://localhost:3000/api/carts/:_id"
  public deleteCartAndCartItems(_id) {
    this.http.delete(this.url + `/${_id}`).subscribe(
      () => {
        this.store.dispatch(new CartActions.DeleteCart())
      }
    )
  }

  // LOIGC SECTION

  // main method for to get latest cart
  public getCart(userId: string): Observable<CartModel> {

    return this.getUserCart(userId).pipe(
      take(1),
      switchMap((cart: CartModel) => {

        // create new cart
        if (!cart) {
          return this.createCart(userId)
        }

        // get active cart items
        return this.cartItemService.getCurentCartItems(cart)
      }))
  }

  public updateCart(cart: CartModel) {
    return this.updateUserCart(cart).pipe(
      tap((cart: CartModel) => {
        this.store.dispatch(new CartActions.AddCart(cart))
        sessionStorage.removeItem("cart")
      })
      )
    }

    public deleteTempCart() {
      this.store.dispatch(new CartActions.DeleteCart())
      sessionStorage.removeItem("cart")
  }


  // SUBJECT SECTION

  public emitEditState(state: boolean) {
    this.editCartState.next(state);
  }

  // LOGIC SECTION
  public createTempCart() {
    const cart = CartModel.getSessionCart()
    this.store.dispatch(new CartActions.AddCart(cart))
    CartModel.setSeeeionCart(cart)
    this.emitEditState(true)
  }


}

