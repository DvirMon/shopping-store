import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { UntypedFormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';
import { OrderService } from 'src/app/services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.scss']
})
export class OrderSearchComponent implements OnInit, OnDestroy {

  @ViewChild('input') inputRef: ElementRef
  @Input() public drawer: MatSidenav

  private subscribtion: Subscription

  public control = new UntypedFormControl();

  constructor(
    private orderService: OrderService

  ) {


  }

  ngOnInit(): void {
    this.search()
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
  }

  private search() {
    this.subscribtion = this.orderService.search(this.control)
      .subscribe(
        () => {
          this.inputRef.nativeElement.focus()
        },
        (err) => {
          this.inputRef.nativeElement.focus()
        }
      )
  }


  // EVENTS SECTION
  public onClick() {
    this.clsoeDrawer()
    this.resetForm()
  }

  public onFocus() {
    this.drawer.opened
      ? this.search()
      : this.drawer.opened = true
  }

  // LOGIC SECTIN

  private clsoeDrawer() {
    this.drawer.opened = false
    this.drawer.close()
  }

  private resetForm() {
    this.control.reset()
    this.orderService.clearResults()
  }


}
