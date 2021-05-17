import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-banner',
  templateUrl: './product-banner.component.html',
  styleUrls: ['./product-banner.component.scss']
})
export class ProductBannerComponent {

  public isMobile: Observable<boolean> = this.productsService.isMobile();
  public alias: Observable<string> = this.productsService.alias$

  constructor(
    private productsService: ProductsService
  ) { }


}
