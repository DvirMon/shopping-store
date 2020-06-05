import { ProductModel } from './product-model';

export class PaginationDataModel {
  public constructor(
    public products?: ProductModel[],
    public pagination?: PaginationModel,
    public pages?: number[]
  ) {
    this.products = [],
      this.pagination = new PaginationModel(),
      this.pages = []
  }
}

export class PageData {
  public constructor(
    public products?: ProductModel[],
    public pages?: number[]
  ) {
  }
}

export class PaginationModel {
  public constructor(
    public length?: number,
    public pageSize?: number,
    public pageIndex?: number,
    public pageCount?: number,
    public pagingCounter?: number,
    public hasPrevPage?: boolean,
    public hasNextPage?: boolean,
    public prev?: number | null,
    public next?: number | null
  ) { }
}
