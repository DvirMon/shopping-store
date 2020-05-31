import { Component, OnInit, forwardRef, Input, Output, HostListener, ElementRef, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { FormService } from 'src/app/utilities/services/form.service';

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
  @Input() imagePath: string

  public file: File | null = null;
  public preview: string

  @Output() public image = new EventEmitter<File>()


  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    this.file = event && event.item(0);
    this.previewImage()
    this.handleImage()
  }


  constructor(
    private host: ElementRef<HTMLInputElement>,
    private formService: FormService,

  ) { }

ngOnInit() {
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
 
  public async  previewImage() {
    this.preview = await this.formService.previewImage(this.file)

  }

  public handleImage() {
    this.image.emit(this.file)
  }
}
