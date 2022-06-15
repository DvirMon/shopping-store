import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { FormService } from 'src/app/services/form.service';

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
