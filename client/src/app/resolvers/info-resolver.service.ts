import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { InfoService } from '../services/info.service';

@Injectable({
  providedIn: 'root'
})
export class InfoResolver implements Resolve<any> {
 
  constructor(
    private infoService: InfoService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<string> | any {
    // console.log(this.infoService.getNotification(route.params.userId))
    return this.infoService.getNotification(route.params.userId)
  }
}
