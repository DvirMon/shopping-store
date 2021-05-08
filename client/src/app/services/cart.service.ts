import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormService } from './form.service';

import { CartModel } from '../utilities/models/cart-model';
import { CartItemModel, CurrentItemModel } from '../utilities/models/cart-item-model';

import { map, switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { store } from '../utilities/redux/store';
import { ActionType } from '../utilities/redux/action-type';

import { environment } from 'src/environments/environment';
import { ProductsService } from './products.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemSubject = new Subject<CurrentItemModel>();

  public itemsSubject = new BehaviorSubject<CurrentItemModel[]>([]);
  public items$: Observable<CurrentItemModel[]> = this.itemsSubject.asObservable()

  private editCartState = new BehaviorSubject<boolean>(false);
  private editState$: Observable<boolean> = this.editCartState.asObservable()


  private cartUrl: string = `${environment.server}/api/carts`;
  private cartItemUrl: string = `${environment.server}/api/cart-item`

  constructor(
    private http: HttpClient,
    private formService: FormService,
    private productsService: ProductsService
  ) { }


  // GETTER SECTION

  public getCartItemSubject(): Subject<CurrentItemModel> {
    return this.cartItemSubject
  }

  public getEditState() {
    return this.editState$
  }

  // HTTP SECTION

  // GET request - latest cart : http://localhost:3000/api/carts/latest/:cartId"
  public getLatestCart(userId): Observable<CartModel> {
    return this.http.get<CartModel>(this.cartUrl + `/latest/${userId}`).pipe(
      take(1),
      switchMap((payload: CartModel) => {

        if (!payload) {
          return of(new CartModel())
        }

        const cart = CartModel.create(payload)

        this.formService.handleStore(ActionType.AddCart, cart)

        if (cart.getIsActive()) {
          // get cart items
          return this.getCurentCartItems(cart)
        }
        return of(cart)
      }))
  }

  // GET request - create new cart : http://localhost:3000/api/carts"

  private tempCart(): Observable<CartModel> {
    return this.http.get<CartModel>(this.cartUrl)
  }

  // POST request - create new cart with user : http://localhost:3000/api/carts"
  private userCart(userId: string): Observable<CartModel> {
    return this.http.post<CartModel>(this.cartUrl, { userId })
  }

  // PATCH request - change cart status : http://localhost:3000/api/carts/:cartId"
  public deactivateCart(cartId: string): Observable<Object> {
    return this.http.patch(this.cartUrl + `/${cartId}`, { isActive: false })
  }


  // ----------------------------------------------------------------------------------//

  // GET request - get latest cart items : : http://localhost:3000/api/cart-item/:cartId"
  public getLatestCartItems(cartId): Observable<CurrentItemModel[]> {
    return this.http.get<CurrentItemModel[]>(this.cartItemUrl + `/${cartId}`).pipe(
      map(cartItems => {
        return cartItems
      })
      )
    }

    // GET request - get latest cart items : : http://localhost:3000/api/cart-item/:cartId"
  public getCurentCartItems(cart: CartModel): Observable<CartModel> {
    return this.http.get<CurrentItemModel[]>(this.cartItemUrl + `/${cart.get_id()}`).pipe(
      map(cartItems => {
        cart.setItems(cartItems)
        this.formService.handleStore(ActionType.SetCartItems, cartItems)
        return cart
      })
    )
  }

  // POST request - add cart item : http://localhost:3000/api/cart-item"
  public addCartItem(cartItem: CartItemModel): Observable<CurrentItemModel> {
    return this.http.post<CurrentItemModel>(this.cartItemUrl, cartItem)
  }

  // PUT request - update cart item : http://localhost:3000/api/cart-item/:_id"
  public updateCartItem(cartItem: CartItemModel): Observable<CurrentItemModel> {
    return this.http.put<CurrentItemModel>(this.cartItemUrl + `/${cartItem._id}`, cartItem)
  }

  // DELETE request - delete cart item : http://localhost:3000/api/cart-item/:_id"
  public deleteCartItem(_id) {
    this.http.delete(this.cartItemUrl + `/${_id}`).subscribe(
      () => {
        this.formService.handleStore(ActionType.DeleteCartItem, _id)
        this.formService.handleStore(ActionType.DeleteReceiptItem, _id)
      }
    )
  }

  // DELETE request -delete cart and cart item : http://localhost:3000/api/carts/:_id"
  public deleteCartAndCartItems(_id) {
    this.http.delete(this.cartUrl + `/${_id}`).subscribe(
      () => {
        this.formService.handleStore(ActionType.ResetCartState)
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
      switchMap((payload: CartModel) => {
        return this.createCartLogic(payload, cartItem)
      }))
  }


  private createCartLogic(payload, cartItem): Observable<CurrentItemModel> {
    const cart = CartModel.create(payload)
    this.formService.handleStore(ActionType.AddCart, cart)
    cartItem.cartId = cart.get_id()
    return this.addCartItem(cartItem)
  }


  public emitCartItem(cartItem: CurrentItemModel) {
    return this.cartItemSubject.next(cartItem)
  }

  public emitEditState(state: boolean) {
    this.editCartState.next(state);
  }


}
//
