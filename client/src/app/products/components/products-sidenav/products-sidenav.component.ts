import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatSidenav } from '@angular/material/sidenav';

import { UserModel } from 'src/app/utilities/models/user-model';
import { CategoryModel } from 'src/app/utilities/models/category-model';

import { FormService } from 'src/app/services/form.service';

// font awoswme icons
import { faCarrot } from "@fortawesome/free-solid-svg-icons/faCarrot"
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons/faBreadSlice"
import { faCheese } from "@fortawesome/free-solid-svg-icons/faCheese"
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons/faDrumstickBite"
import { faCandyCane } from "@fortawesome/free-solid-svg-icons/faCandyCane"
import { faWineBottle } from "@fortawesome/free-solid-svg-icons/faWineBottle"

import { Observable } from 'rxjs';

import { store } from 'src/app/utilities/redux/store';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products-sidenav',
  templateUrl: './products-sidenav.component.html',
  styleUrls: ['./products-sidenav.component.scss']
})
export class ProductsSidenavComponent {

  @Input() public drawerProduct: MatSidenav
  @Input() public isExpanded: boolean;

  private user: UserModel = this.authService.auth.user
  public isLogin: boolean = this.authService.auth.isLogin;

  public categories: CategoryModel[] = store.getState().products.categories;

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
    private authService: AuthService,
  ) { }

  // LOGIC SERCTION

  // method to navigate
  public onNavigate(category: CategoryModel): Promise<boolean> {


    this.activeLink(category._id)

    if (!this.isLogin) {
      return this.router.navigateByUrl(`home/products/categories/${category.alias}/${category._id}`)
    }

    return this.user.isAdmin
      ? this.router.navigateByUrl(`home/products/admin/${category.alias}/${category._id}`)
      : this.router.navigateByUrl(`home/products/${this.user._id}/${category.alias}/${category._id}`)


  }

  public activeLink(_id: string) {

    this.categories.map((category: CategoryModel) => {

      category._id === _id
        ? category.hide = true
        : category.hide = false

    })


  }

  // method to build navigation
  private setNavigationBar() {

    for (const category of this.categories) {
      for (const icon in this.icons) {
        if (category.alias === icon) {
          category.icon = this.icons[icon]
        }
      } 
      // category.alias === "beverages" ? category.hide = true : category.hide = false
      category.hide = category.alias === "beverages"

    }


  }

  // method to change sidnav witdh
  public toggleDrawer() {
    this.isExpanded = !this.isExpanded
    this.drawerProduct.toggle()
  }


}
