import { Component, Input, OnInit } from '@angular/core';

import { ProductModel } from 'src/app/utilities/models/product-model';
import { CategoryModel } from 'src/app/utilities/models/category-model';

import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {

  @Input() public product: ProductModel;
  @Input() public searchTerm: string;

  public categories: CategoryModel[];
  public alias: string;

  constructor(
  ) {
    this.categories = store.getState().products.categories
  }

  ngOnInit() {
    this.alias = this.categories.find(
      category => category._id === this.product.categoryId
    ).alias
  }

}
