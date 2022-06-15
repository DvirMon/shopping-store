import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-banner',
  templateUrl: './product-banner.component.html',
  styleUrls: ['./product-banner.component.scss']
})
export class ProductBannerComponent {


  public ref : string = environment.imageBucket

  public isMobile: Observable<boolean> = this.productsService.isMobile();
  public alias: Observable<string> = this.productsService.alias$

  constructor(
    private productsService: ProductsService
  ) { }


}
