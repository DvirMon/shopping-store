import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/utilities/services/products.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FormService } from 'src/app/utilities/services/form.service';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {

  public productForm: FormGroup
  public editMode: boolean = false
  public formMode: boolean = true
  public categories: CategoryModel[] = store.getState().products.categories
  public selectedValue: string

  constructor(
    private productService: ProductsService,
    private formService: FormService
  ) { }

  ngOnInit(): void {

    this.createForm()
  }

  // form section
  private createForm(): FormGroup {
    return this.productForm = this.formService.productForm()
  }

  get name(): FormControl {
    return this.productForm.get('name') as FormControl
  }
  get price(): FormControl {
    return this.productForm.get('price') as FormControl
  }
  get category(): FormControl {
    return this.productForm.get('category') as FormControl
  }
  get imagePath(): FormControl {
    return this.productForm.get('imagePath') as FormControl
  }

  // request section
  public handleRequest() {

  }

  // logic section
  public onAddProduct() {

    if (this.editMode) {
      const answer = confirm("You are about to start new form, do yow wish to continue ?")
      if (!answer) {
        return
      }
    }



  }


}
