import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  public isMobile: Observable<boolean> = this.formService.isMobile()

  constructor(
    private formService: FormService
  ) { }

  ngOnInit(): void {
  }

}
