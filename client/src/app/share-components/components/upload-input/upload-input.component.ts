import { Component, OnInit, forwardRef, Input, Output, HostListener, ElementRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { FormService } from 'src/app/utilities/services/form.service';
import { FileUploader } from 'ng2-file-upload';


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

  private cd: ChangeDetectorRef

  private uploader: FileUploader;
  private hasBaseDropZoneOver: boolean;
  private hasAnotherDropZoneOver: boolean;

  @Output() public image = new EventEmitter<File>()


  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {

    const file = event && event.item(0);
    this.image.emit(file)
    // const reader = new FileReader()
    // reader.readAsDataURL(file);

    // reader.onload = () => {
    //   // need to run CD since file load runs outside of zone
    //   this.cd.markForCheck();
    //   // this.previewImage()
    // }
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

  public onFileChange(event) {
    console.log(event)
  }

  public previewImage() {
  }

  public handleImage() {
    this.image.emit(this.file)
  }
}
