import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReceiptService } from 'src/app/utilities/services/receipt.service';
import { OrderService } from 'src/app/utilities/services/order.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {

  constructor(
    private router : Router,
    private receiptService : ReceiptService,
  ) { }
 
  ngOnInit(): void {
  }

  public backToSore() {
    this.receiptService.backToSore()
    this.router.navigateByUrl(`/login`)
  }

  public getReceipt() {
    this.receiptService.getReceipt()

  }
  

}
