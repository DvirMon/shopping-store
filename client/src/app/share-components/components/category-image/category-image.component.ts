import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/feat-modules/products/products.service';
import { CategoryModel } from 'src/app/utilities/models/category-model';

@Component({
  selector: 'app-category-image',
  templateUrl: './category-image.component.html',
  styleUrls: ['./category-image.component.scss']
})
export class CategoryImageComponent implements OnInit {

  @Input() category: CategoryModel
  public isMobile$: Observable<boolean> = this.productService.isMobile()
  public show: boolean = false

  constructor(
    private productService: ProductsService,
  ) { }

  ngOnInit(): void {
  }
}
