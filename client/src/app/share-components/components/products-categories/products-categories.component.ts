import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { UserModel } from 'src/app/utilities/models/user-model';
import { store } from 'src/app/utilities/redux/store';

interface RouteModel {
  path: string
  imageUrl: string
}

@Component({
  selector: 'app-products-categories',
  templateUrl: './products-categories.component.html',
  styleUrls: ['./products-categories.component.scss']
})
export class ProductsCategoriesComponent implements OnInit {

  @Input() cols: string
  @Input() rowHeight: string

  public categories: CategoryModel[]
  public hide: boolean = true
  public user : UserModel = store.getState().auth.user


  constructor(
    private router: Router,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {

    this.getCategories()

  }

  private getCategories() {
    if (store.getState().products.categories.length === 0) {
      return this.getCategoriesHttp()
    } else {
      this.categories = store.getState().products.categories
    }
  }

  private getCategoriesHttp() {
    this.productService.getCategories().subscribe(
      (categories) => {
        this.categories = categories
      }
    )
  }

  // EVENET SECTION
  public onClick(category: CategoryModel): Promise<boolean> { 

    if(this.user) {
      return this.router.navigateByUrl(`/products/${this.user._id}/${category.alias}/${category._id}`)
    }
    return this.router.navigateByUrl(`/products/categories/${category.alias}/${category._id}`)
  }


}
