import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/feat-modules/auth/auth.service';
import { ProductsService } from 'src/app/feat-modules/products/products.service';

import { CategoryModel } from 'src/app/utilities/models/category-model';
import { User } from 'src/app/utilities/models/user.model';


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

  private user: User = this.authService.auth.user
  private isLogged: boolean = this.authService.auth.isLogin

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
    if (this.isLogged) {
      return this.router.navigateByUrl(`home/products/${this.user._id}/${category.alias}/${category._id}`)
    }
    return this.router.navigateByUrl(`home/products/categories/${category.alias}/${category._id}`)
  }
}


