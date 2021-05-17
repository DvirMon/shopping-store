import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { DialogService } from 'src/app/services/dialog.service';
import { ProductsService, ProductData } from 'src/app/services/products.service';

import { ProductModel } from 'src/app/utilities/models/product-model';

import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent implements OnInit {

  @Input() public product: ProductModel;

  public isMobile: Observable<boolean> = this.productService.isMobile()
  public isAdmin: boolean = this.authService.auth.user.isAdmin;
  
  public alias: string;

  constructor(
    private authService : AuthService,
    private dialogService: DialogService,
    private productService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.alias = this.productService.getCategoryAlias(this.product)
  }

  public handleProductDialog(): void {

    this.isAdmin
      ? this.productService.handleUpdate.next(this.handleProductData())
      : this.dialogService.handleProductDialog(this.handleProductData())
  }

  private handleProductData(): ProductData {
    return { product: this.product, alias: this.alias }
  }
}

