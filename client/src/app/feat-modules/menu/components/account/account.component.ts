import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/feat-modules/auth/auth.service';
import { FormService } from 'src/app/services/form.service';


export interface AccountItem {

  title: string
  text: string
  imageUrl: string
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public isMobile$: Observable<boolean>

  public items: AccountItem[] = [
    {
      title: "Your Orders",
      imageUrl: "orders",
      text: "Track, return, or buy things again"
    },
    {
      title: "Login & security",
      imageUrl: "security",
      text: "Edit login, name, and mobile number"
    },
    {
      title: "Your Profiles",
      imageUrl: "profile",
      text: "Manage, your profile"
    },
    {
      title: "Your Messages",
      imageUrl: "messeges",
      text: "View messages to and from Amazon, sellers, and buyers"
    },
    {
      title: "Your Payments",
      imageUrl: "payments",
      text: "Manage payment methods and settings, view all transactions"
    },
    {
      title: "Archive Orders",
      imageUrl: "archive",
      text: "View and manage your archived orders"
    }
  ]

  constructor(
    private authService: AuthService,
    private formService: FormService
  ) {

    this.isMobile$ = this.formService.isMobile()
  }

  ngOnInit(): void {


  }

  public onClick() {
    this.authService.logout()
  }

}
