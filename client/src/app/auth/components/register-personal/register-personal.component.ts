import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-personal',
  templateUrl: './register-personal.component.html',
})
export class RegisterPersonalComponent {

  @Input() controlGroup: FormGroup
}
