import { Component, OnInit } from '@angular/core';
import { Category, ProductsService, Product } from 'src/app/services/products.service';
import { Router, ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public categories: Category[] = []
  public products: Product[] = []

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
      console.log(data.products)
      this.products = data.products
    })
  }

}
