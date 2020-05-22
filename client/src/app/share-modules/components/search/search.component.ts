import { Component, OnInit, ViewChildren, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged, tap, take, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product-model';
import { ProductDialog } from 'src/app/models/dialog-model';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatAutocompleteTrigger) panel: MatAutocompleteTrigger;
  public searchControl = new FormControl();
  public searchEntries: Observable<ProductModel[]>
  public results: boolean = false


  constructor(
    private productService: ProductsService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.search()
  }

  // main search function
  public search() {
    this.getSearchTerm().subscribe(
      () => {
        this.searchInput.nativeElement.focus()
      },
      (err) => {
        console.log(err)
        this.search
      }
    )
  }
  
  // function that listen to user search query
  public getSearchTerm(): Observable<ProductModel[]> {
    return this.searchControl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => {
        if (!searchTerm) {
          return []
        }
        return this.getResults(searchTerm)
      }))
    }
    
    // function to fetch result from server
  public getResults(searchTerm): Observable<ProductModel[]> {
    return this.searchEntries = this.productService.searchProducts(searchTerm).pipe(
      tap((response: ProductModel[]) => {
        if (response.length === 0) {
          this.results = true
          return
        }
        this.results = false
        return this.searchEntries
      })
    )
  }

  public onSelect(product) {
    this.panel.openPanel()
    this.dialogService.handleProductDialog(product)
  }

}
