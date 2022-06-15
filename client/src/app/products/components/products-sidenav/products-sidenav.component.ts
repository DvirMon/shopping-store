import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatSidenav } from '@angular/material/sidenav';

import { User } from 'src/app/utilities/models/user.model';
import { CategoryModel } from 'src/app/utilities/models/category-model';

import { FormService } from 'src/app/services/form.service';

// font awoswme icons
import { faCarrot } from "@fortawesome/free-solid-svg-icons/faCarrot"
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons/faBreadSlice"
import { faCheese } from "@fortawesome/free-solid-svg-icons/faCheese"
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons/faDrumstickBite"
import { faCandyCane } from "@fortawesome/free-solid-svg-icons/faCandyCane"
import { faWineBottle } from "@fortawesome/free-solid-svg-icons/faWineBottle"

import { AuthService } from 'src/app/auth/auth.service';
import { ProductsService } from 'src/app/products/products.service';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/utilities/ngrx/state/auth-state';

@Component({
  selector: 'app-products-sidenav',
  templateUrl: './products-sidenav.component.html',
  styleUrls: ['./products-sidenav.component.scss']
})
export class ProductsSidenavComponent {

  @Input() public drawerProduct: MatSidenav
  @Input() public isExpanded: boolean;

  private user: User
  public isLogin: boolean

  public categories$: Observable<CategoryModel[]>

  public icons = {
    beverages: faWineBottle,
    sweets: faCandyCane,
    dairy: faCheese,
    grains: faBreadSlice,
    meat: faDrumstickBite,
    produce: faCarrot,
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private productsService: ProductsService
  ) {
  }
  ngOnInit(): void {
    this.categories$ = this.productsService.categories$;
    this.subsbribeToAuth()
  }


  // LOGIC SERCTION

  private subsbribeToAuth() {
    this.authService.auth$.subscribe(
      (auth : AuthState) => {
        this.isLogin = auth.isLogin
        this.user = auth.user
      }
    )
  }

  // method to navigate
  public onNavigate(category: CategoryModel): Promise<boolean> {


    if (!this.isLogin) {
      return this.router.navigateByUrl(`home/products/categories/${category.alias}/${category._id}`)
    }

    return this.user.isAdmin
      ? this.router.navigateByUrl(`home/products/admin/${category.alias}/${category._id}`)
      : this.router.navigateByUrl(`home/products/${this.user._id}/${category.alias}/${category._id}`)


  }


  // method to change sidnav witdh
  public toggleDrawer() {
    this.isExpanded = !this.isExpanded
    this.drawerProduct.toggle()
  }


}
