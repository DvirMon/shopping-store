import { ProductModel } from "src/app/feat-modules/products/product-model"

export class PageModel {
  public constructor(
    public products?: ProductModel[],
    public pagination?: PaginationModel,
    public alias?: string,
    public pages?: number[],
  ) {
  }

  public isPageExist(): boolean {
    const page = this.pages.indexOf(this.pagination.pageIndex)
    if (page > 0) {
      return true
    }
    return false
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
