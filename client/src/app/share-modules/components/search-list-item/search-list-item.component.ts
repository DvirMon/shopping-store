import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';

@Component({
  selector: 'app-search-list-item',
  templateUrl: './search-list-item.component.html',
  styleUrls: ['./search-list-item.component.scss']
})
export class SearchListItemComponent {

  @Input() public product: ProductModel = new ProductModel()

}
