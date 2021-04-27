import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-slide',
  templateUrl: './products-slide.component.html',
  styleUrls: ['./products-slide.component.scss']
})
export class ProductsSlideComponent implements OnInit {

  public categories : string[] = ["grains", "meat", "dairy", "vegetables"]

  constructor() { }

  ngOnInit(): void {
  }

}
