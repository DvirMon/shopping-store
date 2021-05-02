import { Component, EventEmitter, Input } from '@angular/core';
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
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-sidenav',
  templateUrl: './products-sidenav.component.html',
  styleUrls: ['./products-sidenav.component.scss']
})
export class ProductsSidenavComponent {

  @Input() drawerProduct: MatSidenav

  public categories: CategoryModel[] = store.getState().products.categories;
  public closeDrawer: EventEmitter<boolean> = new EventEmitter();

  public isAdmin: boolean = store.getState().auth.isAdmin;
  public isExpanded: boolean = false;
  public isMobile :Observable<boolean> = this.formService.isMobile()

  private icons = {
    beverages: faWineBottle,
    condiments: faCandyCane,
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
    private formService : FormService
  ) { }


  // LOGIC SERCTION

  // method to navigate
  public onNavigate(category) {



    this.isAdmin
      ? this.router.navigateByUrl(`/admin/products/${category.alias}/${category._id}`)
      : this.router.navigateByUrl(`/products/${category.alias}/${category._id}`)

    this.closeDrawer.emit(false)

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
    this.drawerProduct.toggle()
    this.isExpanded = !this.isExpanded
  }

}
