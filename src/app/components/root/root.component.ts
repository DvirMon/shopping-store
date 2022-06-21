import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormService } from 'src/app/services/form.service';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {


  public show: boolean = false;
  public showCategories: boolean = false;
  public isMobile: Observable<boolean> = this.formService.isMobile();

  @HostListener('window:scroll', ['$event']) public checkScroll() {
    const scrollPosition = window.pageYOffset

    if (scrollPosition >= 70) {
      this.show = true
    }

    if (scrollPosition >= 500) {
      this.showCategories = true
    }
  }


  constructor(
    private formService: FormService,


  ) { }

  ngOnInit(): void {
  }

  public onClick() {
    console.log(1)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });  }
}
