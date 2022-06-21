import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';

import { FormService } from 'src/app/services/form.service';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/feat-modules/auth/auth.service';
import { CartModel } from 'src/app/feat-modules/cart/components/cart-list/cart.model';
import { CartService } from 'src/app/feat-modules/cart/components/cart-list/cart.service';
import { OrderService } from '../../order.service';
import { OrderModel } from './order-model';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, AfterViewInit {

  public orderForm: UntypedFormGroup;
  public cartTotalPrice: number;

  public isMobile$: Observable<boolean> = this.formService.isMobile()

  private cart$: Observable<CartModel> = this.cartService.cart$

  public user : OrderModel = this.authService.auth.user

  constructor(

    private formService: FormService,
    private orderService: OrderService,
    private cartService: CartService,
    private authService : AuthService,

    private order: OrderModel,
    public cart: CartModel,

  ) { }

  ngOnInit(): void {
    this.createForm();
    this.subscribeTCartState()
    this.orderDefaultValues();
  }

  ngAfterViewInit(): void {
    this.subscribeToForm();
  }


  // SUBCRIBTION SECTION

  private subscribeTCartState() {
    this.cart$.subscribe(
      (cart: CartModel) => {
        this.cart = cart
      }
    )
  }

  private subscribeToForm(): void {
    this.orderForm.valueChanges.subscribe(
      (controls) => {
        if (!this.orderForm.errors) {
          this.order.shippingDate = controls.shippingDate
          this.order.creditCard = controls.creditCard.trim()
          this.order.city = controls.address.city
          this.order.street = controls.address.street

        }
      }
    )
  }

  // FORM SECTION

  private createForm(): UntypedFormGroup {
    return this.orderForm = this.formService.orderForm()
  }

  get address(): UntypedFormGroup {
    return this.orderForm.get('address') as UntypedFormGroup
  }

  get shippingDate(): UntypedFormControl {
    return this.orderForm.get('shippingDate') as UntypedFormControl
  }

  get creditCard(): UntypedFormControl {
    return this.orderForm.get('creditCard') as UntypedFormControl
  }

  // end of form section

  //------------------------------------------------------//


  // HTTP SECTION

  public onPayment(): void {
    this.orderService.handleNewOrder(this.order)

  }
  // end of request section

  //------------------------------------------------------//


  // order logic section

  private orderDefaultValues(): void {
    this.order.cartRef = this.cart.get_id()
    this.order.userId = this.authService.auth.user._id
    this.order.totalPrice = this.cart.getTotalPrice()
  }

  // end of logic section


}
