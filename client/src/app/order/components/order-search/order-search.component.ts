import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.scss']
})
export class OrderSearchComponent {

  @Input() public drawer: MatSidenav

  public searchControl = new FormControl();

  constructor(
    private searchService: SearchService,
    private authService: AuthService,

  ) { }


  // EVENTS SECTION
  public onClick() {
    this.searchService.searchOrders(this.authService.auth.user._id, this.searchControl.value).subscribe()
  }
  public onFocus() {
    this.drawer.opened ? null : this.drawer.toggle()
  }

}
