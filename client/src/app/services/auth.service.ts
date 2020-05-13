import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { FormService } from './form.service';
import { ActionType } from '../redux/action-type';
import { Router } from '@angular/router';


export interface Login {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public serverError = new Subject<string>()
  private tokenHelper: JwtHelperService = new JwtHelperService()

  private url: string = " http://localhost:4000/api/auth/"

  constructor(
    private http: HttpClient,
    private formService: FormService,
    private router: Router
  ) { }



  public login(data) {
    this.http.post<string>(this.url + "login", data).subscribe(
      (response) => {
        const payload = this.tokenHelper.decodeToken(response)
        this.formService.handleStore(ActionType.Login, { token: response, user: payload.user })
      },
      (error) => this.serverError.next(error.error)
    )

  }

  public autoLogin() {
    const token = JSON.parse(sessionStorage.getItem("jwt"))
    // this.authToken()
    if (!token) {
      this.logout()
      return
    }
    const payload = this.tokenHelper.decodeToken(token)
    this.formService.handleStore(ActionType.Login, { token, user: payload.user })
    this.router.navigateByUrl(`/home`)
  }

  public logout() {
    this.formService.handleStore(ActionType.Logout)
    this.router.navigateByUrl(`/login`)
  }


  public validUniquePersonalId(data) {
    return this.http.post(this.url + "login", data)
  }
} 
