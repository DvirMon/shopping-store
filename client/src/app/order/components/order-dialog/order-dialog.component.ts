import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReceiptService } from 'src/app/utilities/services/receipt.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {

  constructor(
    private router : Router,
    private receiptService : ReceiptService
  ) { }

  ngOnInit(): void {
  }

  public backToSore() {
    this.receiptService.resetReceiptState()
    this.router.navigateByUrl(`/products/5e91e29b9c08fc560ce2cf32`)
  }

  public getReceipt() {
    this.receiptService.getReceipt()

  }
  

}
