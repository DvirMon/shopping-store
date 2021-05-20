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

  public isMobile$: Observable<boolean> = this.productService.isMobile()
  public searchEntries$: Observable<ProductModel[]> = this.searchService.productsEntries$
  public totalProducts$: Observable<number> = this.productService.getTotalNumberOfProducts()

  public isAdmin: boolean = this.authService.auth.user.isAdmin;

  constructor(
    private dialogService: DialogService,
    private productService: ProductsService,
    private searchService: SearchService,
    private authService  :AuthService

  ) { }


  ngOnInit(): void {

    // this.getStoreProducts();
    this.search();
  }


  // HTTP SECTION

  // main search method
  public search(): void {
    this.searchService.searchProducts(this.searchControl).subscribe(
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
      this.panel.openPanel()
    }

    // const productData = this.handleProductDialogData(product)

    this.isAdmin
      ? this.productService.handleUpdate.next(product)
      : this.dialogService.handleProductDialog(product)
  }

  // open product dialog
  // private handleProductDialogData(product: ProductModel): ProductData {
  //   return { product, alias: this.handleAlias(product) }
  // }

  // get category dialog
  private handleAlias(product): string {
    return this.productService.getCategoryAlias(product)
  }


}
