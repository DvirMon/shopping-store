import { Injectable } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { CartItemModel } from '../models/cart-item-model';
import { ReceiptItemData } from '../models/receipt-model';
import { ProductModel } from '../models/product-model';
import { FormService } from './form.service';
import { OrderModel } from '../models/order-model';
import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root'
})

export class ReceiptService {


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
    private receiptData: OrderModel
  ) { }


  public backToSore() {
    this.resetReceiptState()
    this.formService.handleStore(ActionType.ResetCartState)
  }

  private setFooter(currentPage, pageCount) {
    return currentPage.toString() + ' of ' + pageCount;
  }

  private setHeader(currentPage, pageCount, pageSize) {
    return [
      { text: '', alignment: (currentPage % 2) ? 'left' : 'right' },
      { canvas: [{ type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 }] }
    ]
  }


  public getReceipt() {
    pdfMake.createPdf(this.setPdf()).open();
  }

  public handleReceiptData() {
    this.setProductTable()
    this.setReceiptAdditionalInfo()
  }

  // create product table
  private setProductTable() {

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

  public setReceiptAdditionalInfo() {
    this.receiptData = { ...store.getState().receipt.orderDetails }

    const orderDate = new Date(this.receiptData.orderDate)
    this.receiptData.orderDate = orderDate.toLocaleString()

    const shippingDate = new Date(this.receiptData.shippingDate)
    this.receiptData.shippingDate = shippingDate.toLocaleString()

  }

  public setRecipeItem(product: ProductModel, cartItem: CartItemModel) {
    const recipeItem = new ReceiptItemData(
      cartItem._id,
      product.name,
      product.price.toString(),
      cartItem.quantity.toString(),
      cartItem.totalPrice.toString(),
    )
    this.formService.handleStore(ActionType.AddReceiptItem, recipeItem)
  }

  public resetReceiptState() {
    this.formService.handleStore(ActionType.ResetReceiptState)
  }

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


