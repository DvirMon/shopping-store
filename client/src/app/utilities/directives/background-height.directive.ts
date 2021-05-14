import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormService } from 'src/app/services/form.service';
import { store } from '../redux/store';

@Directive({
  selector: '[appBackgroundHeight]'
})
export class BackgroundHeightDirective {

  private isMobile : boolean;


  @HostBinding("style.height") public height: string;

  @HostListener('window:scroll', ['$event']) public checkScroll() {

    const scrollPosition = window.pageYOffset
 
    if (scrollPosition >= 70) {
      this.height = this.isMobile ? "260vh" : "210vh"
    }

  }


  constructor(
    private formService: FormService
  ) {
    this.formService.isMobile().subscribe(
      (isMobile) => {
        this.isMobile = isMobile
      }
    )
  }




}
