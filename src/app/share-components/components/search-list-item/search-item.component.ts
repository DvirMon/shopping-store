import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/feat-modules/products/product-model';


@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent   {

  @Input() public product: ProductModel;
  @Input() public searchTerm: string;
  @Input() public orderMode: boolean;
  @Input() public cartMode: boolean;



}
