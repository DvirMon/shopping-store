import { Directive, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { store } from '../redux/store';

@Directive({
  selector: '[appBackgroundImage]'
})
export class BackgroundImageDirective {

  @HostBinding("style.backgroundImage.url") public backgroundImage: string;

  constructor( 
    private router: Router
  ) {

    console.log(10)
    this.backgroundImage = 'https://img.thrivemarket.com/custom_assets/6d6692c5fb9c2e7ae3e87b08a467300e.jpg?w=1440'

  }


}
