import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { DialogService } from 'src/app/utilities/services/dialog.service';
import { store } from 'src/app/utilities/redux/store';
import { ProductsService } from 'src/app/utilities/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent {

  @Input() public product: ProductModel
  public isAdmin: boolean = store.getState().auth.isAdmin
  private alias: string

  constructor(
    private dialogService: DialogService,
    private productService: ProductsService,
    private activeRoute: ActivatedRoute
  ) { }

  public handleProductDialog() {

    this.handleAlias() 

    this.isAdmin
      ? this.productService.handleUpdate.next({ product: this.product, alias: this.alias })
      : this.dialogService.handleProductDialog(this.product)
  }

  private handleAlias() {
    this.alias = this.activeRoute.snapshot.params.alias
  }
}

