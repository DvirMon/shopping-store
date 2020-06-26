import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CategoryModel } from 'src/app/utilities/models/category-model';
import { ProductModel } from 'src/app/utilities/models/product-model';

import { ProductsService, ProductData } from 'src/app/utilities/services/products.service';
import { FormService } from 'src/app/utilities/services/form.service';

import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
})
export class ProductsFormComponent implements OnInit, AfterViewInit {

  public categories: CategoryModel[] = store.getState().products.categories
  public productForm: FormGroup
  public editMode: boolean = false
  public formMode: boolean = false
  private alias: string
  private file: File

  constructor(
    private activeRouter: ActivatedRoute,
    private productService: ProductsService,
    private formService: FormService,
    public product: ProductModel,
  ) { }

  ngOnInit(): void {

    this.createForm()
    this.subscribeToRoute()
    this.subscribeToFormControls()
    this.subscribeToSubject()


  }

  ngAfterViewInit(): void {

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
  get categoryId(): FormControl {
    return this.productForm.get('categoryId') as FormControl
  }

  get imagePath(): FormControl {
    return this.productForm.get('imagePath') as FormControl
  }

  // end of form section

  // subscribe section

  // listen to subject updates
  private subscribeToSubject(): void {
    this.productService.handleUpdate.subscribe(
      (data: ProductData) => {
        if (data) {
          this.handleStatusUpdate(data.product)
          this.handleFormUpdate(data.product)
        }
      })
  }

  // listen to form controls values
  private subscribeToFormControls(): void {
    this.productForm.valueChanges.subscribe(
      (product) => {
        this.product.name = product.name
        this.product.price = product.price
        this.product.categoryId = product.categoryId

        if (product.categoryId) {
          this.alias = this.productService.getCategoryAlias(this.product)
        }

      }
    )
  }

  // listen to route params
  private subscribeToRoute(): void {
    this.activeRouter.params.subscribe(
      (params) => {
        this.alias = params.alias
      }
    )
  }

  // end of subscribe section

  // request section 

  public handleRequest(): void {

    // this.handleProductImage()

    this.editMode
      ? this.handleUpdateRequest()
      : this.handleAddRequest()

    this.onClearForm()
  }

  // handle request data
  private handleRequestData(): ProductModel | FormData {
    return typeof this.product.imagePath === "string"
      ? this.product
      : this.formService.setFormData(this.product, this.file, this.alias)
  }

  // handle add product request
  private handleAddRequest(): void {
    this.productService.addProduct(this.handleRequestData())
      .subscribe((product: ProductModel) => {

        this.productService.addProductToStore(product, this.alias)

      }
      )
  }

  // handle update product request
  private handleUpdateRequest(): void {
    this.productService.updateProduct(this.handleRequestData(), this.product._id)
      .subscribe((product: ProductModel) => {
        this.productService.updateProductToStore(product, this.alias)
      }
      )
  }

  // logic section
  public onAddProduct(): void {

    this.formMode = true

    if (this.editMode) {
      if (!this.clearFormMessage("You are about to start new form, do yow wish to continue ?")) {
        return
      }

      this.onClearForm()
    }

  }

  // clear form
  public onClearForm(event?): void {

    if (event && this.formMode) {
      if (!this.clearFormMessage("Clear the form?")) {
        return
      }
    }

    this.editMode = false
    this.productService.handleUpdate.next(null)
    this.product.imagePath = ""
    this.productForm.reset()
  }

  // save file
  public saveFile(file: File): void {
    this.file = file
    this.product.imagePath = this.file
  }


  private handleStatusUpdate(product: ProductModel): void {
    this.product = { ...product }
    this.formMode = true
    this.editMode = true
    this.file = null
  }

  private handleFormUpdate(product: ProductModel): void {
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      categoryId: product.categoryId
    })
  }


  private clearFormMessage(message: string): boolean {
    const answer = confirm(message)
    return answer
  }


}
