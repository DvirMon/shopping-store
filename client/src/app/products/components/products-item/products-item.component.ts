import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent {

  @Input() public product: ProductModel


  constructor(
    private dialogService : DialogService
  ) {}

  public handleProductDialog() {
    this.dialogService.handleProductDialog(this.product)
  }
}

