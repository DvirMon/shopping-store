import { ProductModel } from 'src/app/utilities/models/product-model';
import { Category } from 'src/app/utilities/models/category-model';

export class ProductsAppState {

  public categories: Category[]
  public dairy: [ProductModel[]]
  public meat: [ProductModel[]]
  public fruits: [ProductModel[]]
  public condiments: [ProductModel[]]
  public bread: [ProductModel[]]
  public beverages: [ProductModel[]]
}