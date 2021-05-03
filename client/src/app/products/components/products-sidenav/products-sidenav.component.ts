import { Component, Input } from '@angular/core';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

// font awoswme icons
import { faCarrot } from "@fortawesome/free-solid-svg-icons/faCarrot"
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons/faBreadSlice"
import { faCheese } from "@fortawesome/free-solid-svg-icons/faCheese"
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons/faDrumstickBite"
import { faCandyCane } from "@fortawesome/free-solid-svg-icons/faCandyCane"
import { faWineBottle } from "@fortawesome/free-solid-svg-icons/faWineBottle"

import { MatSidenav } from '@angular/material/sidenav';

import { store } from 'src/app/utilities/redux/store';
import { FormService } from 'src/app/services/form.service';
import { Observable, of } from 'rxjs';
import { UserModel } from 'src/app/utilities/models/user-model';

@Component({
  selector: 'app-products-sidenav',
  templateUrl: './products-sidenav.component.html',
  styleUrls: ['./products-sidenav.component.scss']
})
export class ProductsSidenavComponent {

  @Input() public drawerProduct: MatSidenav
  @Input() public isExpanded: boolean;

  private user: UserModel = store.getState().auth.user
  public isAdmin: boolean = store.getState().auth.isAdmin;
  public isLogin: boolean = store.getState().auth.isLogin;
  public categories: CategoryModel[] = store.getState().products.categories;

  public isMobile: Observable<boolean> = this.formService.isMobile()

  private icons = {
    beverages: faWineBottle,
    sweets: faCandyCane,
    dairy: faCheese,
    grains: faBreadSlice,
    meat: faDrumstickBite,
    produce: faCarrot,
  }

  ngOnInit(): void {
    this.setNavigationBar();

  }

  constructor(
    private router: Router,
    private formService: FormService
  ) { }

  // LOGIC SERCTION

  // method to navigate
  public onNavigate(category): Promise<boolean> {

    if (!this.isLogin) {
      return this.router.navigateByUrl(`/products/categories/${category.alias}/${category._id}`)
    }

    return this.isAdmin
      ? this.router.navigateByUrl(`/products/admin/${category.alias}/${category._id}`)
      : this.router.navigateByUrl(`/products/${this.user._id}/${category.alias}/${category._id}`)


  }

  // method to build navigation
  private setNavigationBar() {

    for (const category of this.categories) {
      for (const icon in this.icons) {
        if (category.alias === icon) {
          category.icon = this.icons[icon]
        }
      }
    }
  }

  // method to change sidnav witdh
  public toggleDrawer() {
    this.isExpanded = !this.isExpanded
    this.drawerProduct.toggle()
  }


}
