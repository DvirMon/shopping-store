import { ReceiptItemData } from 'src/app/utilities/models/receipt-model';
import { OrderModel } from 'src/app/utilities/models/order-model';

export class ReceiptAppState {

  public receipt: ReceiptItemData[] = [];
  public orderDetails : OrderModel = new OrderModel()

}