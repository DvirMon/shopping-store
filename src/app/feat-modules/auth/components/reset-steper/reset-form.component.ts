import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss']
})
export class ResetFormComponent implements OnInit {

  @Input() title: string

  constructor() { }

  ngOnInit(): void {
  }


}
