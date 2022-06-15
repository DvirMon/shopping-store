import { Component, Input } from '@angular/core';
import { User } from 'src/app/utilities/models/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { UntypedFormGroup } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {

  @Input() public controlGroup: UntypedFormGroup;
  @Input() public streetControlName: string;
  @Input() public rowHeight: string;

  public user: User = this.authService.auth.user

  public optionsCity = {
    offset: 3,
    types: ['(cities)'],
    componentRestrictions: { country: 'IL' }
  }

  public optionsStreet = {
    offset: 3,
    types: ['address'],
    componentRestrictions: { country: 'IL' }
  }

  // public selectedValue: boolean = true;

  constructor(
    private authService: AuthService
  ) { }


  // function to update street address
  public handleStreetChange(address: Address) {
    if (address) {
      this.controlGroup.patchValue({ "street": address.name })
      // this.selectedValue = !address.name
    }
    console.log(address)
  }

  public handleCitySelect(address: Address) {

    if (address) {
      this.controlGroup.patchValue({ "city": address.name })
    }

    console.log(address)
    this.optionsStreet.types.push(address.place_id)
  }


}
