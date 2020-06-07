import { Component, Input } from '@angular/core';
import { UserModel } from 'src/app/utilities/models/user-model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent  {

  @Input() public controlGroup: FormGroup
  @Input() public streetControlName: string
  @Input() public user: UserModel
  @Input() public cols: string

  public optionsCity = {
    offset: 3,
    types: ['(cities)'],
    componentRestrictions: { country: 'IL' }
  }

  public optionsStreet = {
    offset: 3,
    types: ['geocode'],
    componentRestrictions: { country: 'IL' }
  }


  public selectedValue: boolean = true;


  public subscribeToFormControl() {

    this.controlGroup.valueChanges.subscribe(
      (values) => {
        console.log(values)
      }
    )
  }

  public addressAutoComplete(controlName: string) {

    if (controlName === "street") {
      this.controlGroup.patchValue({ "street": this.user.street })
      return
    }
    this.controlGroup.patchValue({ "city": this.user.city })

  }

  public handleStreetChange(payload: any) {
    if (payload) {
      this.controlGroup.patchValue({ "street": payload.name })
      this.selectedValue = !payload.name
    }
  }

  public handleCitySelect(payload: any) {
    if (payload) {
      this.controlGroup.patchValue({ "city": payload.name })
      this.controlGroup.patchValue({ "street": payload.name })
    }

  }


}
