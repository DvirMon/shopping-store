import { Component, EventEmitter } from '@angular/core';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { Router } from '@angular/router';

import { faCarrot } from "@fortawesome/free-solid-svg-icons/faCarrot"
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons/faBreadSlice"
import { faCheese } from "@fortawesome/free-solid-svg-icons/faCheese"
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons/faDrumstickBite"
import { faCandyCane } from "@fortawesome/free-solid-svg-icons/faCandyCane"
import { faWineBottle } from "@fortawesome/free-solid-svg-icons/faWineBottle"

import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-products-nav-list',
  templateUrl: './products-nav-list.component.html',
  styleUrls: ['./products-nav-list.component.scss']
})
export class ProductsNavListComponent {

  public categories: CategoryModel[] = store.getState().products.categories;
  public closeDrawer: EventEmitter<boolean> = new EventEmitter();

  public isAdmin: boolean = store.getState().auth.isAdmin;

  public icons = [
    faWineBottle, 
    faCandyCane,
    faCheese,
    faBreadSlice,
    faDrumstickBite,
    faCarrot,
  ];


  constructor(
    private router: Router,

  ) { }

  // function to navigate
  public onNavigate(category) {

    this.isAdmin
      ? this.router.navigateByUrl(`/admin/products/${category.alias}/${category._id}`)
      : this.router.navigateByUrl(`/products/${category.alias}/${category._id}`)

    this.closeDrawer.emit(false)

  }


}
