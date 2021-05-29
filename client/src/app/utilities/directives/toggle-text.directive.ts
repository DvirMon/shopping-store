import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleText]'
})
export class ToggleTextDirective {



  @HostListener('mouseenter')
  mouseenter() {
    console.log("OMG It's a Mouse!!!");
  }

  @HostListener('mouseleave')
  mouseout() {
    console.log('Phew thank god it left!')
  }

  constructor() { }

}
