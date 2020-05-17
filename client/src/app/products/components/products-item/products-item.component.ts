import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent implements OnInit {

  public product : Product

  constructor() { }

  ngOnInit(): void {
  }

}
