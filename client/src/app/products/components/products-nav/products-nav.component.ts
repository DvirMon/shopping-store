import { Component, Input } from '@angular/core';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { store } from 'src/app/utilities/redux/store';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/utilities/services/products.service';

@Component({
  selector: 'app-products-nav',
  templateUrl: './products-nav.component.html',
  styleUrls: ['./products-nav.component.scss']
})
export class ProductsNavComponent {

  @Input() drawer: MatSidenav
  @Input() isAdmin: boolean
  public categories: CategoryModel[] = store.getState().products.categories

  // public isAdmin: boolean = store.getState().auth.isAdmin

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) { }

  public onNavigate(category) {
    this.isAdmin
      ? this.router.navigateByUrl(`/admin/products/${category.alias}/${category._id}`)
      : this.router.navigateByUrl(`/products/${category.alias}/${category._id}`)
  }

  public onDrawerClickEvent() {
    this.drawer.toggle()
    this.productsService.productsCols.next(this.drawer.opened)
  }

}
