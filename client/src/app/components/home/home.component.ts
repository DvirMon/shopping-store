import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public cols: number = 1
  public rowHeight: string = "31vh"

  constructor(
  )
  {}

  ngOnInit(): void {

    if (window.innerWidth > 820) {
      this.cols = 3
      this.rowHeight = "92vh"
    }
  }

}
