import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { UserModel } from 'src/app/utilities/models/user-model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-products-categories',
  templateUrl: './products-categories.component.html',
  styleUrls: ['./products-categories.component.scss']
})
export class ProductsCategoriesComponent implements OnInit {

  @Input() cols: string
  @Input() rowHeight: string

  public isMobile$: Observable<boolean> = this.productService.isMobile()
  public categories: CategoryModel[]

  private user : UserModel = this.authService.auth.user
  private isLoggin: boolean = this.authService.auth.isLogin


  constructor(
    private router: Router,
    private productService: ProductsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.getCategories()

  }


  // HTTP SECTION
  private getCategoriesHttp() {
    this.productService.getCategories().subscribe(
      (categories) => {
        this.categories = categories
      }
    )
  }

  // LOGIC SECTION
  private getCategories() {
    if (store.getState().products.categories.length === 0) {
      return this.getCategoriesHttp()
    } else {
      this.categories = store.getState().products.categories
    }
  }

  // EVENET SECTION
  public onClick(category: CategoryModel): Promise<boolean> {


    if (this.isLoggin) {
      return this.router.navigateByUrl(`home/products/${this.user._id}/${category.alias}/${category._id}`)
    }
    return this.router.navigateByUrl(`home/products/categories/${category.alias}/${category._id}`)
  }


}
