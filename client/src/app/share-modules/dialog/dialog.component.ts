import { Component, Inject, OnInit } from '@angular/core';
import { DialogData, ErrorDialogData } from 'src/app/models/dialog-model';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject(MAT_DIALOG_DATA) public errorData: ErrorDialogData,
    ) { }
    


ngOnInit() {
}

} 
