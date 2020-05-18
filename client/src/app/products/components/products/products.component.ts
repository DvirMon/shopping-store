import { Component, OnInit } from '@angular/core';
import { Category, ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Data } from '@angular/router';
import { ProductModel } from 'src/app/models/product-model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public categories: Category[] = []
  public products: ProductModel[] = []

  constructor(

    private productsService: ProductsService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.productsService.getProductsCategories().subscribe(
      (response) => this.categories = response
    )

    this.routeSubscription()
  }

  private routeSubscription() {
    this.activeRoute.data.subscribe((data: Data) => {
      this.products = data.products
    })
  }

}
