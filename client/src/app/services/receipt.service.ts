import { Injectable } from '@angular/core';

import { FormService } from './form.service';

import { CurrentItemModel } from '../utilities/models/cart-item-model';
import { ReceiptItemModel } from '../utilities/models/receipt-model';
import { ProductModel } from '../utilities/models/product-model';
import { OrderModel } from '../utilities/models/order-model';

import { ActionType } from '../utilities/redux/action-type';
import { store } from '../utilities/redux/store';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import { Store } from '@ngrx/store';
import { CartState, cartState } from '../utilities/ngrx/state/cart-state';
import * as  CartActions from "../utilities/ngrx/actions/cart-action";
import { AppState } from '../utilities/ngrx/store';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root'
})



export class ReceiptService {

  private appState: AppState

  private receiptBody: (string[] | {}[])[] =
    [
      [
        { text: 'Product' },
        { text: 'Price(1 unit)', alignment: 'center' },
        { text: 'Quantity', alignment: 'center' },
        { text: 'Total Price', alignment: 'center' }
      ]
    ]


  constructor(
    private formService: FormService,
    private ngrxStore: Store<AppState>,
    private receiptData: OrderModel
  ) {

  }
  // function to download receipt file
  public getReceipt(): void {
    pdfMake.createPdf(this.setPdf()).download();
  }


  private setFooter(currentPage, pageCount): string {
    return currentPage.toString() + ' of ' + pageCount;
  }

  private setHeader(currentPage, pageCount, pageSize) {
    return [
      { text: '', alignment: (currentPage % 2) ? 'left' : 'right' },
      { canvas: [{ type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 }] }
    ]
  }


  public handleReceiptData(): void {
    this.setProductTable()
    this.setReceiptAdditionalInfo()
  }

  // create product table
  private setProductTable(): void {

    const receiptItems = [...store.getState().receipt.receipt]

    for (const item of receiptItems) {
      delete item.id
      const receiptRow: {}[] = []

      for (const key in item) {

        if (key === "name") {
          receiptRow.push({ text: item[key], alignment: 'left' })
        }
        else if (key === 'price' || key === 'totalPrice') {
          receiptRow.push({ text: `${item[key]}$`, alignment: 'center' })
        }
        else {
          receiptRow.push({ text: item[key], alignment: 'center' })
        }
      }

      this.receiptBody.push(receiptRow)
    }

  }

  // handle receipt additional data
  private setReceiptAdditionalInfo(): void {
    // this.receiptData = { ...store.getState().receipt.orderDetails }

    this.formatReceiptDate()
  }

  // handle date format
  private formatReceiptDate(): void {
    const orderDate = new Date(this.receiptData.orderDate)
    this.receiptData.orderDate = orderDate.toLocaleString()

    const shippingDate = new Date(this.receiptData.shippingDate).toLocaleString().split(',')[0]
    this.receiptData.shippingDate = shippingDate
  }

  // save cart item as receipt format in store
  public setReceiptItem(product: ProductModel, cartItem: CurrentItemModel): void {
    if (product) {

      const recipeItem = new ReceiptItemModel(
        cartItem._id,
        product.name,
        product.price.toString(),
        cartItem.quantity.toString(),
        (cartItem.quantity * product.price).toString(),

      )
      this.formService.handleStore(ActionType.AddReceiptItem, recipeItem)
    }
  }

  // clean receipt state
  public resetReceiptState(): void {
    this.formService.handleStore(ActionType.ResetReceiptState)
  }

  public backToSore(): void {
    this.resetReceiptState()
    this.ngrxStore.dispatch(new CartActions.ResetCart())
  }

  // set pdf file
  public setPdf() {

    const docDefinition = {

      footer: (currentPage, pageCount) => this.setFooter(currentPage, pageCount),
      header: (currentPage, pageCount, pageSize) => this.setHeader(currentPage, pageCount, pageSize),
      content: [
        { text: 'Recipe', style: 'header' },
        { text: `Order Number : ${this.receiptData._id}` },
        { text: `Order Date : ${this.receiptData.orderDate} ` },
        { text: `Arriving Date : ${this.receiptData.shippingDate}` },
        { text: `To: ${this.receiptData.city},  ${this.receiptData.street}` },
        { text: 'Products Summery', style: 'subheader' },
        {
          table: {
            widths: ['*', '*', '*', '*'],
            body: this.receiptBody
          }
        },
        {
          table: {
            widths: [377, '*'],
            body: [
              ['', { text: `${this.receiptData.totalPrice}$`, alignment: 'center', noWrap: true }],
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },

    }
    return docDefinition
  }


}


