import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appTollbar]'
})
export class TollbarDirective {

  @HostBinding("style.position") public position: string;
  @HostBinding("style.display") public display: string;
  @HostBinding("style.zIndex") public zIndex: number;

  @HostListener('window:scroll', ['$event']) public checkScroll() {

    const scrollPosition = window.pageYOffset
  }

}
