import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';
import { OrderHistoryModel } from 'src/app/utilities/models/order-model';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.scss']
})
export class OrderSearchComponent implements OnInit {

  @ViewChild('input') input: ElementRef

  @Input() public drawer: MatSidenav

  public searchControl = new FormControl();

  constructor(
    private searchService: SearchService,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
    this.search()
  }

  private search() {
    this.searchService.searchOrders(this.searchControl, this.authService.auth.user._id)
      .subscribe(
        () => {
          this.input.nativeElement.focus()
        },
        (err) => {
          this.input.nativeElement.focus()
        }
      )
  }


  // EVENTS SECTION
  public onClick() {

  }

  public onFocus() {
    this.drawer.opened ? null : this.drawer.toggle()
  }

}
