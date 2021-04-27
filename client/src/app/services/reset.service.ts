import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface ResetModel {
  contact?: string
  token?: string
}


@Injectable({
  providedIn: 'root'
})
export class ResetService {

  private url: string = `${environment.server}/api/reset`

  constructor(
    private http: HttpClient
  ) {

  }

  // POST REQUEST = get confirmation code - http://localhost:3000/api/reset/code
  public getConfirmationCode(contact: string): Observable<ResetModel> {
    return this.http.post<ResetModel>(this.url + "/code", { contact },
      { withCredentials: true })

  }

  // POST REQUEST = get confirmation code - http://localhost:3000/api/reset/confirmatin
  public validConfirmationCode(code: string): Observable<boolean> {
    return this.http.post<boolean>(this.url + "/confirm", { code }, {
      withCredentials: true
    })
  }

  public setNewPasswored(payload: { password: string, email: string }) {

    return this.http.post<string>(this.url + "/new-password", payload, {
      withCredentials: true
    })
  }

  // LOGIC SETCTION

  public getResetData(): ResetModel {
    return JSON.parse(sessionStorage.getItem("confirmation"))
  }

  public setResetData(payload: ResetModel) {
    sessionStorage.setItem("confirmation", JSON.stringify(payload));
  }



}
