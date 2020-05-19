import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Category } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-bar',
  templateUrl: './products-bar.component.html',
  styleUrls: ['./products-bar.component.scss']
})
export class ProductsBarComponent {

  @Input() public categories: Category[] = []
  public open: boolean = true

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }


}
