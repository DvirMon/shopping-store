
export class CategoryModel {

  constructor(
    public _id?: string,
    public name?: string,
    public alias?: string,
    public icon?,
    public hide? : boolean
  ) {
  }
}
