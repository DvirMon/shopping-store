import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {

  @Input() public control: FormControl
  
  public ccFormat: string;

  public cards: string[] = ["Visa", "Mastercard ", " American Express", "Discover"];



  constructor() { }

  ngOnInit(): void {
  }

}

  // public creditCardFormat() {

  //   this.creditCard.valueChanges.pipe(
  //     debounceTime(500),
  //     take(1),
  //     map(value => {
  //       this.ccFormat = [...value].map((chr, idx) => (idx + 1) % 4 ? chr : chr + ' ').join('').trim();
  //       return this.ccFormat
  //     }
  //     )).subscribe(
  //       () => {
  //         if (this.ccFormat.length > 4) {
  //           this.creditCard.setValue(this.ccFormat)
  //         }
  //       }
  //     )
  // }
