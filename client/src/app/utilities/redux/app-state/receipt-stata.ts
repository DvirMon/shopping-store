import { ReceiptItemModel } from 'src/app/utilities/models/receipt-model';
import { OrderModel } from 'src/app/utilities/models/order-model';

export class ReceiptAppState {

  public receipt: ReceiptItemModel[] = [];
  public orderDetails : OrderModel = new OrderModel()

}
