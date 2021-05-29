import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { MatSelect } from '@angular/material/select';
import { FormGroup, FormControl } from '@angular/forms';

import { FormService } from 'src/app/services/form.service';
import { UserModel } from 'src/app/utilities/models/user.model';
import { OrderService } from 'src/app/services/order.service';

import { CartModel } from 'src/app/utilities/models/cart.model';
import { OrderModel } from 'src/app/utilities/models/order-model';

import { store } from 'src/app/utilities/redux/store';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, AfterViewInit {

  public orderForm: FormGroup;
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

  private createForm(): FormGroup {
    return this.orderForm = this.formService.orderForm()
  }

  get address(): FormGroup {
    return this.orderForm.get('address') as FormGroup
  }

  get shippingDate(): FormControl {
    return this.orderForm.get('shippingDate') as FormControl
  }

  get creditCard(): FormControl {
    return this.orderForm.get('creditCard') as FormControl
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
