
 export class ProductModel {

  public constructor(
    public _id?: string,
    public name?: string,
    public price?: number,
    public categoryId?: string,
    public imagePath?: string | File,
  ) { }

}