import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatSidenav } from '@angular/material/sidenav';

import { ProductModel } from 'src/app/utilities/models/product-model';

import { SearchService } from 'src/app/services/search.service';
import { ProductsService } from 'src/app/services/products.service';
import { DialogService } from 'src/app/services/dialog.service';

import { store } from 'src/app/utilities/redux/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatAutocompleteTrigger) panel: MatAutocompleteTrigger;

  @Input() public drawer: MatSidenav;

  public searchControl = new FormControl();

  public isMobile$: Observable<boolean>
  public searchEntries$: Observable<ProductModel[]>
  public totalProducts$: Observable<number>
  public results$ : Observable<boolean>

  public isAdmin: boolean = this.authService.auth.user.isAdmin;

  constructor(
    private dialogService: DialogService,
    private productService: ProductsService,
    private authService: AuthService

  ) {
    this.isMobile$ = this.productService.isMobile()
    this.searchEntries$ = this.productService.searchEntries$
    this.totalProducts$ = this.productService.getTotalNumberOfProducts()

  }


  ngOnInit(): void {
    this.search();
  }


  // HTTP SECTION

  // main search method
  public search(): void {
    this.productService.search(this.searchControl).subscribe(
      () => {
        this.searchInput.nativeElement.focus()
      },
      (err) => {
        this.searchInput.nativeElement.focus()
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

}
