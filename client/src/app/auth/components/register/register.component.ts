import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup
  public cityList: string[] = ["Tel Aviv", "Petah Rikva", "Rishon Zion", "Jerusalem", "Bear Sheva"]

  constructor(
    private formService: FormService,
    private authService: AuthService,
    private router: Router

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

  get personal() {
    return this.registerForm.controls['personalDetails']['controls']
  }

  get auth() {
    return this.registerForm.controls['authDetails']['controls']
  }


  // end form section


  // request section 

  public onSubmit() {
    const user: UserModel = { ...this.personalDetails.value, ...this.authDetails.value }
    this.authService.register(user).subscribe(
      (userId) => this.router.navigateByUrl(`/home/${userId}`)
    )
  }
}
