import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-menu-account-sidenav',
  templateUrl: './menu-account-sidenav.component.html',
  styleUrls: ['./menu-account-sidenav.component.scss']
})
export class MenuAccountSidenavComponent implements OnInit {

  public isMobile: Observable<boolean> = this.formService.isMobile()

  public items: string[] = [
    "My Orders",
    "Logout"
  ]

  constructor(
    private formService: FormService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }


  public onClick(action: string) {

    switch (action) {
      case "Logout":
        this.logout()
        break;
      case "My Orders":
        break
    }

  }
  private logout() {
    this.authService.logout()
  }

}
