import { Component, OnInit, forwardRef, Input, Output, HostListener, ElementRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { FormService } from 'src/app/utilities/services/form.service';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { ProductsService } from 'src/app/utilities/services/products.service';


@Component({
  selector: 'app-upload-input',
  templateUrl: './upload-input.component.html',
  styleUrls: ['./upload-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadInputComponent),
      multi: true
    },
  ]
})
export class UploadInputComponent implements OnInit {


  @Input() control: FormControl
  @Input() imagePath: boolean
  
  public file: File | null = null;
  public preview: string

  private cd: ChangeDetectorRef
  
  @Output() public image = new EventEmitter<File>()
  
  
  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    
    this.file = event && event.item(0);
    this.image.emit(this.file)
    this.previewImage()
  }
  

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private formService: FormService,
    private productService: ProductsService,
    public product: ProductModel

  ) { }
  
  ngOnInit() {
    this.subscribeToSubject()
  }

  private subscribeToSubject() {
    this.productService.productToUpdate.subscribe(
      (product) => {
        this.product = product
        this.imagePath = true
      })
  }

  writeValue(value: null) {

    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  public registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any) {
  }

  public onFileChange(event) {
    console.log(event)
  }

  public async previewImage() {
    try {
      this.preview = await this.formService.previewImage(this.file)
    }
    catch (err) {
      console.log(err)
    }
  }


}
