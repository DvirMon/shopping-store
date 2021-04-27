import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html', 
  styleUrls: ['./root.component.scss']
})
export class RootComponent {

  public show: boolean = false
  public showCategories: boolean = false

  @HostListener('window:scroll', ['$event'])
  public checkScroll() {
    const scrollPosition = window.pageYOffset

    if (scrollPosition >= 70) {
      this.show = true
    }

    if (scrollPosition >= 500) {
      this.showCategories = true
    }
  }


  constructor(
    public el: ElementRef

  ) { }
}
