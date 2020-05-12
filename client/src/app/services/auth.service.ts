import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Login {
  email : string,
  password : string
} 

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url : string = " http://localhost:4000/api/auth/"

  constructor(
    private http : HttpClient
  ) { }
  
  
 
  public login(data) : Observable<string> {
    return this.http.post<string>(this.url + "login", data)
  }
} 
