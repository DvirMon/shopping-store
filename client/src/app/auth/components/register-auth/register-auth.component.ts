import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-auth',
  templateUrl: './register-auth.component.html',
})
export class RegisterAuthComponent  {

  @Input() controlGroup: FormGroup
}
