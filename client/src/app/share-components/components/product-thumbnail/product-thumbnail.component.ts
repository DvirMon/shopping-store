import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  @Input() alias: string;

  public routAlias: string
  public environment = environment

  constructor(
    private activeRoute: ActivatedRoute
  ) { }


  ngOnInit() : void {
    this.activeRoute.params.subscribe(
      (params) => {
        this.routAlias = params.alias
      }
    )
  }


}
