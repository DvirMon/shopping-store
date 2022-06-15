import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatSidenav } from '@angular/material/sidenav';

import { ProductModel } from 'src/app/products/product-model';

import { SearchService } from 'src/app/services/search.service';
import { ProductsService } from 'src/app/products/products.service';
import { DialogService } from 'src/app/services/dialog.service';

import { store } from 'src/app/utilities/redux/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {

  @ViewChild('input') input: ElementRef;
  @ViewChild(MatAutocompleteTrigger) panel: MatAutocompleteTrigger;

  @Input() public drawer: MatSidenav;

  public control = new UntypedFormControl();

  public isMobile$: Observable<boolean>
  public searchEntries$: Observable<ProductModel[]>
  public totalProducts$: Observable<number>
  public results$: Observable<boolean>

  public isAdmin: boolean

  private subscibtion: Subscription

  constructor(
    private dialogService: DialogService,
    private productService: ProductsService,
    private authService: AuthService

  ) {
    this.isMobile$ = this.productService.isMobile()
    this.searchEntries$ = this.productService.searchEntries$
    this.totalProducts$ = this.productService.getTotalNumberOfProducts()
    this.isAdmin = this.authService.auth.user.isAdmin;
  }

  ngOnDestroy(): void {
    if (this.subscibtion) {
      this.subscibtion.unsubscribe()
    }
  }


  // HTTP SECTION

  // main search method
  public search(): void {
    this.subscibtion = this.productService.search(this.control).subscribe(
      () => {
        this.input.nativeElement.focus()
      },
      (err) => {
        this.input.nativeElement.focus()
      }
    )
  }




  // LOGIC SECTION

  // action to fire when search tab is selected
  public onSelect(product: ProductModel) {

    if (this.panel) {
      // this.panel.openPanel()
    }

    this.isAdmin
      ? this.productService.handleUpdate.next(product)
      : this.dialogService.handleProductDialog(product)
  }

  public onClose() {
    this.drawer.toggle()
    this.control.reset()
    this.productService.productsSearchEntries.next([])
  }

  public onClear() {
    this.control.reset()
    this.productService.productsSearchEntries.next([])
  }

}
