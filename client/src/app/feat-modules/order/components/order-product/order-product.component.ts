import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CurrentItemModel } from 'src/app/feat-modules/cart/components/cart-list-item/cart-item-model';
import { ProductModel } from 'src/app/feat-modules/products/product-model';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss']
})
export class OrderProductComponent implements OnInit {

  @Input() items: CurrentItemModel
  @Input() isMobile$: Observable<boolean>
  @Input() date: string

  public isExpired$: Observable<boolean>

  constructor(
    private dialodService: DialogService
  ) { }

  ngOnInit(): void {
    this.isExpired$ = this.isDateExpired()
  }



  public onClick(product: ProductModel) {
    this.dialodService.handleProductDialog(product)
  }

  public isDateExpired(): Observable<boolean> {
    if (new Date(this.date).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0)) {
      return of(true)
    }

    return of(false);
  };

}
