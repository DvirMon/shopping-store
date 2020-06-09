import { ProductModel } from 'src/app/utilities/models/product-model';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { PaginationDataModel } from '../../models/pagination-model';

export class ProductsAppState {

  // public products: ProductModel[] = []
  public categories: CategoryModel[] = []
  public beverages: PaginationDataModel = new PaginationDataModel();
  public condiments: PaginationDataModel = new PaginationDataModel();
  public dairy: PaginationDataModel = new PaginationDataModel();
  public grains: PaginationDataModel = new PaginationDataModel();
  public meat: PaginationDataModel = new PaginationDataModel();
  public produce: PaginationDataModel = new PaginationDataModel();
}