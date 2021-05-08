import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';

export interface PathMotel {
  path: string
  icon: string
}

@Component({
  selector: 'app-menu-toolbar',
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.scss']
})
export class MenuToolbarComponent implements OnInit {

  @Input() isMobile: Observable<boolean>
  @Input() drawer: MatDrawer

  public routes: PathMotel[] = [
    { path: "/home", icon: "home" },
    { path: "/account", icon: "account_circle"},
    { path: "/cart", icon: "shopping_cart"},
    { path: "/menu", icon: "menu" },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
