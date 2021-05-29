import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserModel } from 'src/app/utilities/models/user.model';

import { ReceiptService } from 'src/app/services/receipt.service';

import { store } from 'src/app/utilities/redux/store';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent  {

  constructor(
    private router: Router,
    private receiptService: ReceiptService,
  ) { }

  // logic section

  public backToSore(): void {
    this.receiptService.backToSore();
    this.router.navigateByUrl(`/home`);
  }

  public getReceipt(): void {
    this.receiptService.getReceipt();

  }

  // end of logic section

}
