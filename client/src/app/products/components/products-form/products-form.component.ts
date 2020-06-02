import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductsService } from 'src/app/utilities/services/products.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FormService } from 'src/app/utilities/services/form.service';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { store } from 'src/app/utilities/redux/store';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/utilities/services/admin.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit, AfterViewInit {

  public categories: CategoryModel[] = store.getState().products.categories
  public productForm: FormGroup
  public editMode: boolean = false
  public formMode: boolean = false
  public selectedValue: string
  private alias: string
  private file: File

  constructor(
    private productService: ProductsService,
    private formService: FormService,
    private adminService: AdminService,
    public product: ProductModel,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.createForm()
    this.subscribeToRoute()
    this.subscribeToFormControls()
  }

  ngAfterViewInit() {
    this.subscribeToSubject()
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

  private subscribeToSubject() {
    this.productService.productToUpdate.subscribe(
      (product: ProductModel) => {
        this.handleFormUpdate(product)
        this.handleProductUpdate(product)
      })
  }

  private subscribeToFormControls() {
    this.productForm.valueChanges.subscribe(
      (product) => {
        this.product.name = product.name
        this.product.price = product.price
        this.product.categoryId = product.categoryId
      }
    )
  }


  private subscribeToRoute() {
    this.activeRouter.params.subscribe(
      (params) => this.alias = params.alias
    )
  }

  // end of subscribe section

  // request section 
  public handleRequest() {

    this.handleProductImage()

    this.editMode
      ? this.handleUpdateRequest()
      : this.handleAddRequest()

    this.onClearForm()
  }

  private handleDataFormat() {
    return typeof this.product.imagePath === "string"
      ? this.product
      : this.formService.setFormData(this.product, this.file, this.alias)
  }

  private handleAddRequest() {
    this.adminService.addProduct(this.handleDataFormat()).subscribe(
      (product) => this.productService.addProductToStore(product, this.alias)
    )
  } 
  private handleUpdateRequest() {
    this.adminService.updateProduct(this.handleDataFormat(), this.product._id).subscribe(
      (product) => this.productService.updateProductToStore(product, this.alias)
    )
  }

  // logic section
  public onAddProduct() {

    this.formMode = true

    if (this.editMode) {
      const answer = confirm("You are about to start new form, do yow wish to continue ?")
      if (!answer) {
        return
      }

      this.editMode = false
      this.productForm.reset()
    }

  }

  public onClearForm() {
    this.editMode = false
    this.productForm.reset()
  }

  public localFile(file: File) {
    this.file = file
    this.product.imagePath = file
  }

  private handleProductImage() {
    if (this.file) {
      this.product.imagePath = this.file
    }
  }

  private handleProductUpdate(product: ProductModel) {
    this.formMode = true
    this.editMode = true
    this.selectedValue = product.categoryId
    this.product = { ...product }
    this.file = null
  }

  private handleFormUpdate(product: ProductModel) {
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      categoryId: product.categoryId
    })
  }



}
