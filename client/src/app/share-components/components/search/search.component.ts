import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatSort, Sort } from '@angular/material/sort';

import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

import { ProductsService, ProductData } from 'src/app/utilities/services/products.service';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { DialogService } from 'src/app/utilities/services/dialog.service';
import { PaginationService } from 'src/app/utilities/services/pagination.service';
import { ActivatedRoute } from '@angular/router';

import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAutocompleteTrigger) panel: MatAutocompleteTrigger;


  public searchControl = new FormControl();
  public searchEntries: Observable<ProductModel[]>;
  public totalProducts: Observable<number>;
  public isAdmin: boolean = store.getState().auth.isAdmin
  public results: boolean = false;
  private alias: string


  constructor(
    private dialogService: DialogService,
    private productService: ProductsService,
    private paginationService: PaginationService,
    private activeRoute: ActivatedRoute,

  ) { }


  ngOnInit(): void {
    this.getStoreProducts()
    this.subscribeToRoute()
    this.search()
  }

  ngAfterViewInit(): void {
    this.subscribeToSort()
    this.subscribeToRoute()
  }

  // subscription section

  private subscribeToRoute() {
    this.activeRoute.params.subscribe(
      (params) => {
        this.alias = params.alias
        if (this.sort) {
          this.paginationService.getSortedData(this.alias, this.sort)
        }
      }
    );
  }


  private subscribeToSort() {
    this.sort.sortChange.subscribe(
      (sort: Sort) => this.paginationService.getSortedData(this.alias, this.sort)
    )
  }

  // function that listen to user search query
  public subscribeToControl(): Observable<ProductModel[]> {
    return this.searchControl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => {
        if (!searchTerm || !searchTerm.trim() || this.validFormat(searchTerm)) {
          return this.handleSearchError()
        }
        return this.getResults(searchTerm.trim())
      }))
  }


  // end of subscription section 

  // requests section



  // main search function
  public search(): void {
    this.subscribeToControl().subscribe(
      () => {
        this.searchInput.nativeElement.focus()
      },
      (err) => {
        console.log(err)
        this.search
      }
    )
  }


  // function to fetch result from server
  public getResults(searchTerm): Observable<ProductModel[]> {
    return  this.searchEntries = this.handleSearch(searchTerm)
  }


  private handleSearch(searchTerm): Observable<ProductModel[]> {
    return this.productService.searchProducts(searchTerm).pipe(
      tap((response: ProductModel[]) => {
        this.handleMobileSearch(response)

        if (response.length === 0) {
          this.results = true
          return
        }
        this.results = false

        return this.searchEntries
      })
    )
  }


  private getStoreProducts() {
    this.totalProducts = this.productService.getTotalNumberOfProducts()
  }

  // end of requests section

  // logic section

  // action to fire when search tab is selected
  public onSelect(product) {

    this.panel.openPanel()

    const productData = this.handleProductDialogData(product)

    this.isAdmin
      ? this.productService.handleUpdate.next(productData)
      : this.dialogService.handleProductDialog(productData)
  }

  // open product dialog
  private handleProductDialogData(product: ProductModel): ProductData {
    return { product, alias: this.handleAlias(product) }
  }

  // get category dialog
  private handleAlias(product): string {
    return this.productService.getCategoryAlias(product)
  }

  // handle search entries for mobile
  private handleMobileSearch(response: ProductModel[]) {
    this.productService.isMobile().subscribe(
      (mobile) => {
        if (mobile) {
          this.productService.handleSearchEntries.next(response)
        }
      }
    )

  }

  // prevent search with special symbols
  private validFormat(searchTerm: string): boolean {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(searchTerm)

  }

  // handle search error
  private handleSearchError(): Observable<[]> {
    this.results = true
    this.productService.handleSearchEntries.next([]);
    this.searchEntries = of([]);
    return of([]);
  }
}