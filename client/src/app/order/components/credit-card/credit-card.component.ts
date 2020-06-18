import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { faCcAmex } from '@fortawesome/free-brands-svg-icons';
import { faCcJcb } from '@fortawesome/free-brands-svg-icons';
import { ccCard } from 'src/app/utilities/models/credit-card-model';

import Cleave from 'cleave.js-master'

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit, AfterViewInit {


  @ViewChild('input') input: ElementRef
  @Input() public control: FormControl

  public cleave: Cleave
  public ccCards : ccCard[] = []
  
  ngOnInit(): void {
    const visa: ccCard = new ccCard(faCcVisa, false, "visa");
    const amex : ccCard = new ccCard(faCcAmex, false, "amex");
    const mc : ccCard = new ccCard(faCcMastercard, false, "mastercard");
    const jcb : ccCard = new ccCard( faCcJcb, false, "jcb");
    this.ccCards = [visa, mc, amex, jcb]
    
  }

  
  ngAfterViewInit() {

    this.cleave = new Cleave(this.input.nativeElement, {
      creditCard: true,
      onCreditCardTypeChanged: (type) => {
        this.handleIconColor(type)
      }
    })

  }

  private handleIconColor(value) {

    for(const card of this.ccCards) {
      card.name === value ? card.color = true : card.color = false
    }

  }



}