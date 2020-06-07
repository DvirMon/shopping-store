import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/utilities/models/user-model';
import { FormGroup } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  @Input() public controlGroup: FormGroup
  @Input() public user: UserModel

  public formatAddress: string
  public options = {
    offset : 3,
    types: ['geocode'],
    componentRestrictions: { country: 'IL' }
  }

  public selectedValue: string;
  public cityList: string[] = ["Tel Aviv", "Petah Rikva", "Rishon Zion", "Jerusalem", "Beer Sheva", "Haifa", "Ashdod", "Natania"];


  constructor() { }

  ngOnInit(): void {
  }

  public addressAutoComplete(controlName: string) {
    if (controlName === "street") {
      this.controlGroup.patchValue({ "street": this.user.street })
      return
    }
    this.controlGroup.patchValue({ "city": this.user.city })
    this.selectedValue = this.user.city

  }

  public handleAddressChange(payload: any) {
    if (payload) {
      const address = payload.formatted_address.split(',')
      console.log(address[0].trim())
      console.log(address[1].trim())
      this.formatAddress = payload.formatted_address
    }
  }

}
