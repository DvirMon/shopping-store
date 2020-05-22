import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/utilities/models/product-model';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.scss']
})
export class ProductThumbnailComponent  {

  @Input() product : ProductModel = new ProductModel()
  @Input() imageHeight : number
  @Input() imageWidth : number
  @Input() class : string
 

}
