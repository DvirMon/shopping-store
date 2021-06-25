import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormService } from 'src/app/services/form.service';

import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { StripeElementsOptions } from '@stripe/stripe-js'
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-order-payment-strip',
  templateUrl: './order-payment-strip.component.html',
  styleUrls: ['./order-payment-strip.component.scss']
})
export class OrderPaymentStripComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  // public cardOptions: StripeCardElementOptions = {
  //   style: {
  //     base: {
  //       width: 5
  //       iconColor: '#666EE8',
  //       color: '#31325F',
  //       fontWeight: '300',
  //       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //       fontSize: '18px',
  //       '::placeholder': {
  //         color: '#CFD7E0'
  //       }
  //     }
  //   }
  // };

  public elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  public stripeTest: FormGroup;

  constructor(
    private orderService : OrderService,
    private stripeService : StripeService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.stripeTest = this.formService.paymentForm()
  }

  public onCheckout() {
    this.orderService.checkout(this.stripeService)
  }

  public createToken() {

    const name = this.stripeTest.get('name').value;
 

    this.orderService.createToken(this.stripeService, name, this.card)
  }



}
