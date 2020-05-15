import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 
  public registerForm : FormGroup
  public cityList : string[] = ["Tel Aviv", "Petah Rikva", "Rishon Zion", "Jerusalem", "Bear Sheva"]

  constructor( 
    private formService : FormService,
    private authService : AuthService,
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  // form section
  public createForm() {
    this.registerForm = this.formService.registerForm()
  }

  get personalDetails() {
    return this.registerForm.get('personalDetails') as FormGroup
  }
  
  get authDetails() {
    return this.registerForm.get('authDetails') as FormGroup
  }

  public onSelect(event) {
    
  }
  // end form section
}
