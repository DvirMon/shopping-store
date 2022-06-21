import { CategoryModel } from 'src/app/utilities/models/category-model';
import { PageModel } from '../../models/pagination-model';

export class ProductsAppState {

  public categories: CategoryModel[] = []
  public beverages: PageModel = null;
  public sweets: PageModel = null;
  public dairy: PageModel = null;
  public grains: PageModel = null;
  public meat: PageModel = null;
  public produce: PageModel = null;

}
