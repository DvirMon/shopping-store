import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { MatSelect } from '@angular/material/select';
import { FormGroup, FormControl } from '@angular/forms';

import { FormService } from 'src/app/utilities/services/form.service';
import { UserModel } from 'src/app/utilities/models/user-model';
import { OrderService } from 'src/app/utilities/services/order.service';

import { CartModel } from 'src/app/utilities/models/cart-model';
import { OrderModel } from 'src/app/utilities/models/order-model';

import { store } from 'src/app/redux/store';

import { tap, map, debounceTime, take } from 'rxjs/operators';
import { ActivatedRoute, Data } from '@angular/router';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSelect) mySelect: MatSelect
  @ViewChild('cc') cc: ElementRef

  public orderForm: FormGroup;
  public cartTotalPrice: number;
  public ccFormat: string;
  public selectedValue: string;
  public cityList: string[] = ["Tel Aviv", "Petah Rikva", "Rishon Zion", "Jerusalem", "Bear Sheva", "Haifa", "Ashdod", "Natania"];

  constructor(
    private formService: FormService,
    private orderService: OrderService,
    private order: OrderModel,
    public user: UserModel,
    public cart: CartModel,
    private activeRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this.createForm()
    this.handleStoreSubscribe()
    this.orderDefaultValues()
    // this.creditCardFormat()
  }

  ngAfterViewInit() {
    this.formValueSubscription()
  }


  // subscribe section

  private handleStoreSubscribe(): void {
    store.subscribe(
      () => {
        this.user = store.getState().auth.user;
        this.cart = store.getState().cart.cart;
        this.cartTotalPrice = store.getState().cart.cartTotalPrice;
      }
    )
    this.user = store.getState().auth.user;
    this.cart = store.getState().cart.cart;
    this.cartTotalPrice = store.getState().cart.cartTotalPrice;
  }

  private formValueSubscription(): void {
    this.orderForm.valueChanges.subscribe(
      (controls) => {
        if (!this.orderForm.errors) {
          this.order.shippingDate = controls.shippingDate
          this.order.creditCard = controls.creditCard
          this.order.city = controls.address.city
          this.order.street = controls.address.street
        }
      }
    )
  }
  // end of subscribe section

  // form section

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

  // auto fille address input 
  public addressAutoComplete(controlName: string) {
    if (controlName === "street") {
      this.address.patchValue({ "street": this.user.street })
      return
    }
    this.address.patchValue({ "city": this.user.city })
    this.selectedValue = this.user.city

  }

  // end of form section

  // order request section 

  public onPayment() {

    console.log(this.order)
    this.orderService.handleNewOrder(this.order)
  }

  // end of request section


  // order logic section

  private orderDefaultValues() {
    this.order.cartId = this.cart._id
    this.order.userId = this.user._id
    this.order.totalPrice = this.cartTotalPrice
  }

  // public creditCardFormat() {

  //   this.creditCard.valueChanges.pipe(
  //     debounceTime(500),
  //     take(1),
  //     map(value => {
  //       this.ccFormat = [...value].map((chr, idx) => (idx + 1) % 4 ? chr : chr + ' ').join('').trim();
  //       return this.ccFormat
  //     }
  //     )).subscribe(
  //       () => {
  //         if (this.ccFormat.length > 4) {
  //           this.creditCard.setValue(this.ccFormat)
  //         }
  //       }
  //     )
  // }


}
