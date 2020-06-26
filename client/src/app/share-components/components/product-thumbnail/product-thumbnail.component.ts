import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
})
export class ProductThumbnailComponent implements OnInit {

  @Input() product: ProductModel = new ProductModel()
  @Input() imageHeight: number
  @Input() imageWidth: number
  @Input() alias: string

  public routAlias: string
  public environment = environment

  constructor(
    private activeRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params) => {
        this.routAlias = params.alias
      }
    )
  }


}
