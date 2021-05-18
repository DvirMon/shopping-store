import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-menu-dashbord',
  templateUrl: './menu-dashbord.component.html',
  styleUrls: ['./menu-dashbord.component.scss']
})
export class MenuDashbordComponent implements OnInit {

  public isMobile$ : Observable<boolean> = this.formService.isMobile()

  constructor(
    private formService : FormService
  ) { }

  ngOnInit(): void {
  }

}
