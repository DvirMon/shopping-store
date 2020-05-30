import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderModel } from '../models/order-model';
import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CartService } from './cart.service';
import { DialogService } from './dialog.service';
import { FormService } from './form.service';
import { ReceiptService } from './receipt.service';
import { ActionType } from '../redux/action-type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  public baseUrl: string = "http://localhost:3000/api/orders"

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private dialogService: DialogService,
    private formService: FormService,
    private receiptService: ReceiptService
  ) { }


  public handleNewOrder(data: OrderModel) : void{
    this.http.post<OrderModel>(this.baseUrl, data).pipe(
      switchMap((order: OrderModel) => {
        this.formService.handleStore(ActionType.GetOrderData, order)
        this.receiptService.handleReceiptData()
        return this.cartService.disActiveCart(order.cartId)
      }),
    ).subscribe(
      () => {
        this.dialogService.handleOrderDialog()
      }
    )
  }

  public getOccupiedDates(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + "/dates")
  }





}
