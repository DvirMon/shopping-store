import { Component, Input, OnInit } from '@angular/core';
import { AccountItem } from '../account/account.component';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit {

  @Input() item : AccountItem



  constructor() { }

  ngOnInit(): void {
  }

}
