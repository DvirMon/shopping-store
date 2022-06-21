import { CategoryModel } from 'src/app/utilities/models/category-model';
import { PageModel } from '../../models/pagination-model';

export class ProductsState {

  public categories: CategoryModel[] = []
  public beverages: PageModel[] = [];
  public sweets: PageModel[] = [];
  public dairy: PageModel[] = [];
  public grains: PageModel[] = [];
  public meat: PageModel[] = [];
  public produce: PageModel[] = [];

}
