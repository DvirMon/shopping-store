import { Component, Input } from '@angular/core';
import { UserModel } from 'src/app/utilities/models/user-model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent  {

  @Input() public controlGroup: FormGroup;
  @Input() public streetControlName: string;
  @Input() public user: UserModel;
  @Input() public rowHeight: string;

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

  // function to update form address
  public addressAutoComplete(controlName: string) {
    
    if (controlName === "street") {
      this.controlGroup.patchValue({ "street": this.user.street })
      return
    }
    this.controlGroup.patchValue({ "city": this.user.city })
    
  }
  
  // function to update street address
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
