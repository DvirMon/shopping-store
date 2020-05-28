import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/utilities/services/products.service';
import { ActivatedRoute, Data } from '@angular/router';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public categories: CategoryModel[] = []
  public collection: [ProductModel[]]
  public categoryId: string
  public alias: string

  constructor(

    private productService: ProductsService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.subscribeToRoute()
    this.subscribeToStore()


  }


  // subscription section

  private subscribeToStore() {
    store.subscribe(
      () => this.collection = this.formatCollection());
  }

  private subscribeToRoute(): void {
    this.getCategories();
    this.getCategoryId();

  }

  private getCategoryId(): void {
    this.activeRoute.params.subscribe(
      (params) => {
        this.categoryId = params.categoryId;
        this.getCategoryAlias();
        this.handleProductsRequest();
      }
    );
  }

  private getCategories(): void {
    this.activeRoute.data.subscribe((data: Data) => {
      this.categories = data.categories;

    });
  }


  // end of subscription section

  private handleProductsRequest(): void {
    store.getState().products[this.alias].length === 0
      ? this.productService.getProductsByCategory(this.categoryId).subscribe(
        (products) => this.collection = this.productService.formatProductsArray(products)
      )
      : this.collection = this.formatCollection();
  }

  //  end of request section

  private getCategoryAlias(): void {
    const category = this.categories.find(category => category._id === this.categoryId);
    this.alias = category.alias;
  }

  private formatCollection(): [ProductModel[]] {
    const products = store.getState().products[this.alias];
    return this.productService.formatProductsArray(products);
  }

}
