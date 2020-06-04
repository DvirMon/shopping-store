import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-street',
  templateUrl: './street.component.html',
  styleUrls: ['./street.component.scss']
})
export class StreetComponent implements OnInit {

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  public formatAddress: string
  public options = {
    types: ['geocode'],
    componentRestrictions: { country: 'IL' }

  }

  constructor() { }

  ngOnInit(): void {
  }

  public handleAddressChange(payload: Address) {
    if (payload) {
      const address = payload.formatted_address.split(',')
      console.log(address[0].trim())
      console.log(address[1].trim())
      this.formatAddress = payload.formatted_address
    }
  }


}
