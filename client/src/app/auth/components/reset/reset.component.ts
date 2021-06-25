import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {


  @ViewChild('stepper') public stepper: MatStepper;

  public isMobile: Observable<boolean> = this.formService.isMobile();

  constructor(
    private formService: FormService
  ) { }

  ngOnInit(): void {
  }

  public next(step: MatStep) {
    step.completed = true;
    this.stepper.next()
  }

}
