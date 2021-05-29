import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CategoryModel } from 'src/app/utilities/models/category-model';
import { UserModel } from 'src/app/utilities/models/user.model';

import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

import { store } from 'src/app/utilities/redux/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products-categories',
  templateUrl: './products-categories.component.html',
  styleUrls: ['./products-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsCategoriesComponent implements OnInit {

  @Input() cols: string
  @Input() rowHeight: string

  public categories$: Observable<CategoryModel[]> = this.productService.categories$

  private user: UserModel = this.authService.auth.user
  private isLoggin: boolean = this.authService.auth.isLogin

  constructor(
    private router: Router,
    private productService: ProductsService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.subscribeToCategories()
  }

  private subscribeToCategories() {
  }


  // EVENET SECTION
  public onClick(category: CategoryModel): Promise<boolean> {
    if (this.isLoggin) {
      return this.router.navigateByUrl(`home/products/${this.user._id}/${category.alias}/${category._id}`)
    }
    return this.router.navigateByUrl(`home/products/categories/${category.alias}/${category._id}`)
  }
}


