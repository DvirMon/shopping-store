import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormService } from 'src/app/utilities/services/form.service';
import { OrderService } from 'src/app/utilities/services/order.service';
import { OrderModel } from 'src/app/utilities/models/order-model';
import { store } from 'src/app/redux/store';
import { CartModel } from 'src/app/utilities/models/cart-model';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { UserModel } from 'src/app/utilities/models/user-model';
import { map, tap } from 'rxjs/operators';
import { MatSelect, MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSelect) mySelect: MatSelect

  public orderForm: FormGroup
  public cartTotalPrice: number
  public selectedValue: string = "aaaa"
  public cityList: string[] = ["Tel Aviv", "Petah Rikva", "Rishon Zion", "Jerusalem", "Bear Sheva", "Haifa"]

  constructor(
    private formService: FormService,
    private orderService: OrderService,
    private order: OrderModel,
    private user: UserModel,
    public cart: CartModel

  ) { }

  ngOnInit(): void {

    this.createForm()
    this.handleStoreSubscribe()
    this.orderDefaultValues()
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
    this.orderForm.valueChanges.pipe(
      tap(controls => {

        if (!this.orderForm.errors) {
          this.order.shippingDate = controls.shippingDate
          this.order.creditCard = controls.creditCard
          this.order.city = controls.address.city
          this.order.street = controls.address.street
        }
      })
    ).subscribe()
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


  // end of form section

  private orderDefaultValues() {
    this.order.cartId = this.cart._id
    this.order.userId = this.user._id
    this.order.totalPrice = this.cartTotalPrice
  }

  public addressAutoComplete(controlName: string) {
    if (controlName === "street") {
      this.address.patchValue({ "street": this.user.street })
      return
    }
    this.address.patchValue({ "city": this.user.city })
    this.selectedValue = this.user.city

  }

  public onPayment() {

    console.log(this.order)
  }


}
