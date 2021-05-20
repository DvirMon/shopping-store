import { Component, Input, OnInit } from '@angular/core';

import { ProductModel } from 'src/app/utilities/models/product-model';
import { CategoryModel } from 'src/app/utilities/models/category-model';

import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent   {

  @Input() public product: ProductModel;
  @Input() public searchTerm: string;



}
