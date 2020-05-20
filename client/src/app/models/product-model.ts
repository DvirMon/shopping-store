import { Injectable } from '@angular/core';

 export class ProductModel {

  public constructor(
    public _id?: string,
    public name?: string,
    public price?: number,
    public categoryId?: string,
    public imagePath?: string,
  ) { }

  static show(product : ProductModel) {
    for (const key in product) {
      console.log(`${key} : ${product[key]}`) 
    }
  }
}