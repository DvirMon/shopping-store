import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { FormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.scss']
})
export class OrderSearchComponent implements OnInit, AfterViewInit {

  @ViewChild('input') inputRef: ElementRef

  @Input() public drawer: MatSidenav

  public searchControl = new FormControl();

  constructor(
    private searchService: SearchService,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
    this.search()
  }

  ngAfterViewInit(): void {
  }

  private search() {


    this.searchService.searchOrders(this.searchControl, this.authService.auth.user._id)
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
    this.drawer.opened = false
    this.drawer.close()
  }

  public onFocus() {
    this.drawer.opened
      ? null
      : this.drawer.opened = true

    // this.drawer.closedStart ? this.input.nativeElement.focus() : null



  }

}
