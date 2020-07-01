import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { DialogService } from 'src/app/utilities/services/dialog.service';
import { store } from 'src/app/utilities/redux/store';
import { ProductsService, ProductData } from 'src/app/utilities/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent implements OnInit {

  @Input() public product: ProductModel;
  public isAdmin: boolean = store.getState().auth.isAdmin;
  public alias: string;


  constructor(
    private dialogService: DialogService,
    private productService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.alias = this.productService.getCategoryAlias(this.product)

  }

  public handleProductDialog() {

    this.isAdmin
      ? this.productService.handleUpdate.next(this.handleProductData())
      : this.dialogService.handleProductDialog(this.handleProductData())
  }

  private handleAlias(): string {
    return this.productService.getCategoryAlias(this.product)
  }

  private handleProductData(): ProductData {
    return { product: this.product, alias: this.handleAlias() }
  }
}

