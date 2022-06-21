import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reset-method',
  templateUrl: './reset-method.component.html',
  styleUrls: ['./reset-method.component.scss']
})
export class ResetMethodComponent {

  @Output() public next = new EventEmitter();

  constructor() { }

  public buttons = [
    { title: "Reset with email account", value: "email" },
    { title: "Reset with phone number", value: "phone" }
  ]

  public method: string

  public onChange(event) {
    this.method = event.value
  }

  public onClick() {
    this.next.emit()
  }

}
