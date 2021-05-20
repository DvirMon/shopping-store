import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.scss']
})
export class SearchImageComponent  {

  @Input() public value: string
  @Input() public searchEntries$: Observable<any[]>
  @Input() public isMobile$: Observable<boolean> 
  
  public results$: Observable<boolean> = this.searchService.results$ 
  
  constructor(
   private searchService : SearchService
 ) {}

}
