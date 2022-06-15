import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/feat-modules/auth/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductModel } from '../../product-model';
import { ProductsService } from '../../products.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent {

  @Input() public product: ProductModel;

  public isMobile: Observable<boolean> = this.productService.isMobile()
  public isAdmin: boolean = this.authService.auth.user.isAdmin;

  constructor(
    private authService : AuthService,
    private dialogService: DialogService,
    private productService: ProductsService,
  ) { }

  public handleProductDialog(): void {

    this.isAdmin
      ? this.productService.handleUpdate.next(this.product)
      : this.dialogService.handleProductDialog(this.product)
  }


}

