import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highLight'
})
export class HighLightPipe implements PipeTransform {

  constructor(

    private sanitizer: DomSanitizer
  ) { }

  transform(value: string, searchTerm : string, tag = 'mark'): any {

    if (!searchTerm) {
      return value;
    }
    // Match in a case insensitive manner
    const re = new RegExp(searchTerm, 'gi');
    const match = value.match(re);

    // If there's no match, just return the original value.
    if (!match) {
      return value;
    }

    const replacedValue = value.replace(re, `<${tag}>` + match[0] + `</${tag}>`)
    return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  }
}


