import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from 'src/app/products/products.service';

import { ProductModel } from 'src/app/products/product-model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
})
export class ProductThumbnailComponent implements OnInit {

  @Input() product: ProductModel;
  @Input() imageHeight: number;
  @Input() imageWidth: number;

  public alias: string
  public environment = environment

  private categories$ = this.productService.categories$

  constructor(
    private productService: ProductsService
  ) { }


  ngOnInit(): void {
    this.getCategoryAlias()
  }

  // get product category alias
  public getCategoryAlias() {
    this.categories$.subscribe(
      (categories) => {
        if (categories.length > 0) {
          this.alias = categories.find(category => category._id === this.product.categoryId).alias
        }
      }
    )
  }

}
