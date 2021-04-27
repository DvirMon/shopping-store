import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations: [
    trigger('fade-up', [
      state('start',
        style({
          opacity: 0,
          transform: 'translateY(80px)'
        })),
      state('end',
        style({
          opacity: 1,
          transform: 'translateY(70px)'
        })),
      // transition('normal => start', animate(0)),
      transition('start => end', animate(600)),
    ]),
    trigger('fade-up-card', [
      state('start',
        style({
          opacity: 0,
          transform: 'translateY(80px)'
        })),
      state('end',
        style({
          opacity: 1,
          transform: 'translateY(50px)'
        })),
      // transition('normal => start', animate(0)),
      transition('start => end', animate(600)),
    ]),

  ],

})
export class MembersComponent implements OnInit {

  public state = {
    title: "start",
    green: "start",
    red: "start",
    blue: "start"
  }

  @HostListener('window:scroll', ['$event'])
  public checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop
    const scrollPosition = window.pageYOffset

    // console.log(scrollPosition)


    if (scrollPosition >= 200) {
      this.state.title = "end"
      console.log("enter")
    }
  }


  constructor(
    public el: ElementRef
  ) { }

  ngOnInit(): void {
    // this.checkScroll()
  }


  // public state: boolean = false



  animationEnded(stateClass: string) {

    if (this.state.title === "start") {
      return
    }

    console.log(stateClass)

    // console.log(this.state[state])
    this.state[stateClass] = "end"

  }

}
