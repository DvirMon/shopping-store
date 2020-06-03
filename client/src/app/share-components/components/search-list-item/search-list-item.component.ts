import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/utilities/services/products.service';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { CategoryModel } from 'src/app/utilities/models/category-model';

import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-search-list-item',
  templateUrl: './search-list-item.component.html',
  styleUrls: ['./search-list-item.component.scss']
})
export class SearchListItemComponent implements OnInit {

  @Input() public product: ProductModel = new ProductModel()
  @Input() public searchTerm: string

  public categories: CategoryModel[];
  public alias: string

  constructor(
    private productService : ProductsService
  ) {

    this.categories = store.getState().products.categories
  }

  ngOnInit() {
    this.alias = this.categories.find(
      category => category._id === this.product.categoryId
    ).alias
  }

} 
