import { Component, OnInit, Inject } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.scss']
})
export class ProductsDialogComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public Product: ProductModel,

  ) { }

  ngOnInit(): void {
  }

}
