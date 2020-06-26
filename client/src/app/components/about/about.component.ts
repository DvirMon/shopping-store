import { Component, OnInit } from '@angular/core';

import { faShippingFast } from "@fortawesome/free-solid-svg-icons/faShippingFast"
import { faCreditCard } from "@fortawesome/free-solid-svg-icons/faCreditCard"
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public shippingFast: IconDefinition = faShippingFast
  public creditCard: IconDefinition = faCreditCard
  constructor() { }


  ngOnInit(): void {
  }


}