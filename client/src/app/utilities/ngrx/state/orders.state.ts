import { OrderHistoryModel } from "../../models/order-model";

export class OrderState {

  public history: OrderHistoryModel[] = []
  public years: number[] = []
  public order: OrderHistoryModel;


}
