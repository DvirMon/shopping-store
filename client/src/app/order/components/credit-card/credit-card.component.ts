import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import { faCcDinersClub } from '@fortawesome/free-brands-svg-icons';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { faCcAmex } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent {

  @Input() public control: FormControl

  public cards: string[] = ["Visa", "Mastercard ", " American Express", "Discover"];


  public visa = faCcVisa;
  public amex = faCcAmex;
  public mc = faCcMastercard;
  public diners = faCcDinersClub;

}