import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.scss']
})
export class OrderSearchComponent implements OnInit {

  public searchControl = new FormControl();
  constructor() { }

  ngOnInit(): void {
  }

}
