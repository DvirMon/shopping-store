export class CartModel {

  public constructor(
    public _id?: string, 
    public userId? : string,
    public isActive?: boolean,
    public createDate?: Date
  ) { }
}