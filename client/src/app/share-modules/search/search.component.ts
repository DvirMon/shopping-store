import { Component, OnInit, ViewChildren, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged, tap, take, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product-model';
import { ProductDialog } from 'src/app/models/dialog-model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  @ViewChild('searchInput') searchInput: ElementRef;
  public searchControl = new FormControl();
  public searchEntries: Observable<ProductModel[]>
  public filteredOptions: Observable<string[]>;
  public searchTerm: boolean = false


  constructor(
    private productService: ProductsService,
  ) { }

  ngOnInit() {

    this.getSearchTerm().subscribe(
      () => {
        this.searchInput.nativeElement.focus()
      }
    )

  }

  public getSearchTerm(): Observable<ProductModel[]> {
    return this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => {
        if (!searchTerm) {
          return []
        }
        return this.searchEntries = this.productService.searchProducts(searchTerm).pipe(
          tap((response: ProductModel[]) => {
            if (response.length === 0) {
              this.searchTerm = true
              return
            }
            this.searchTerm = false
            return this.searchEntries
          })
        )
      }))
  }

  public onSelect(event) {
    event.stopPropagation();
  }

}
