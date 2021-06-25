import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reset-method',
  templateUrl: './reset-method.component.html',
  styleUrls: ['./reset-method.component.scss']
})
export class ResetMethodComponent implements OnInit {

  @Output() public next = new EventEmitter();

  constructor() { }

  public checkBox = [
    { title: "Reset with email account", value: "email" },
    { title: "Reset with phone number", value: "phone" }
  ]

  public method: string

  ngOnInit(): void {
  }

  public onCheck(value) {
    this.method = value
    this.next.emit()

  }

}
