import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { DialogService } from 'src/app/utilities/services/dialog.service';
import { store } from 'src/app/utilities/redux/store';
import { ProductsService } from 'src/app/utilities/services/products.service';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent {

  @Input() public product: ProductModel
  public isAdmin: boolean = store.getState().auth.isAdmin


  constructor(
    private dialogService: DialogService,
    private productService : ProductsService
  ) { }

  public handleProductDialog() {
    this.isAdmin
      ? this.productService.productToUpdate.next(this.product)
      : this.dialogService.handleProductDialog(this.product)
  }
}

