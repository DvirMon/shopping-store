import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceiptService } from 'src/app/utilities/services/receipt.service';
import { store } from 'src/app/utilities/redux/store';
import { UserModel } from 'src/app/utilities/models/user-model';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {


  constructor(
    private router : Router,
    private receiptService : ReceiptService,
    private user : UserModel
  ) { }
 
  ngOnInit(): void {
    this.handleStoreSubscribe()
  }

  private handleStoreSubscribe(): void {
    store.subscribe(() => this.user = store.getState().auth.user)
    this.user = store.getState().auth.user;
  }
  
  public backToSore() {
    this.receiptService.backToSore()
    this.router.navigateByUrl(`/home/${this.user._id}`)
  }

  public getReceipt() { 
    this.receiptService.getReceipt()

  }
  

}
