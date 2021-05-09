import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FormService } from 'src/app/services/form.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-banner',
  templateUrl: './product-banner.component.html',
  styleUrls: ['./product-banner.component.scss']
})
export class ProductBannerComponent implements OnInit, AfterViewInit {

  public isMobile: Observable<boolean> = this.productsService.isMobile();
  public alias: Observable<string> = this.productsService.alias$

  constructor( 
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
