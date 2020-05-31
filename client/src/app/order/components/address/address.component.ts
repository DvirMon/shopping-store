import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserModel } from 'src/app/utilities/models/user-model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
})
export class AddressComponent implements OnInit {

  @Input() public controlGroup: FormGroup
  @Input() public user: UserModel

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


}
