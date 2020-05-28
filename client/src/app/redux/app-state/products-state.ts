import { ProductModel } from 'src/app/utilities/models/product-model';
import { CategoryModel } from 'src/app/utilities/models/category-model';

export class ProductsAppState {

  public categories: CategoryModel[] = []
  public dairy: ProductModel[] = []
  public meat: ProductModel[] = []
  public fruits: ProductModel[] = []
  public condiments: ProductModel[] = []
  public grains: ProductModel[] = []
  public beverages: ProductModel[] = []
}