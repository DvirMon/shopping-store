import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { ReceiptService } from 'src/app/services/receipt.service';


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
