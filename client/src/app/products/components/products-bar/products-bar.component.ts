import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/utilities/models/category-model';

@Component({
  selector: 'app-products-bar',
  templateUrl: './products-bar.component.html',
  styleUrls: ['./products-bar.component.scss']
})
export class ProductsBarComponent  {

  @Input() public categories: CategoryModel[] = []
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
