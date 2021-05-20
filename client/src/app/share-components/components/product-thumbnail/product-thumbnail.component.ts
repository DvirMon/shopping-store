import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from 'src/app/services/products.service';

import { ProductModel } from 'src/app/utilities/models/product-model';

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

  constructor(
    private productService: ProductsService
  ) { }


  ngOnInit(): void {
    this.alias = this.productService.getCategoryAlias(this.product)
  }


}
