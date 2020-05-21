import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  @Input() public product: ProductModel = new ProductModel()
  constructor() { }

  ngOnInit(): void {
  }

}
