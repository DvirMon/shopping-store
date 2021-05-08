import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { CurrentItemModel } from 'src/app/utilities/models/cart-item-model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss']
})
export class CartButtonComponent implements OnInit ,OnDestroy{

  @Input() public drawerCart: MatSidenav 
  @Input() isAdmin: boolean

  public isMobile: Observable<boolean> = this.productsService.isMobile()
  public currentItems: CurrentItemModel[]

  private unsubscribeToStore: Function;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.subscribeToStore()
  }

  ngOnDestroy(): void {
    this.unsubscribeToStore()
  }

  private subscribeToStore(): void {
    this.unsubscribeToStore = store.subscribe(
      () => {
        this.currentItems = [...store.getState().cart.cart.getItems()];
      }
    )
    this.currentItems = [...store.getState().cart.cart.getItems()];
  }

  public onDrawerCart() {
    this.drawerCart.toggle()
    this.productsService.handleDrawerToggle.next(this.drawerCart.opened)
  }


}
