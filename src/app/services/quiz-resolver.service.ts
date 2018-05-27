import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { SwapiService } from './swapi.service';

@Injectable({
  providedIn: 'root'
})
export class QuizResolverService implements Resolve<any>{

  constructor(
    private router: Router,
    private swapiService: SwapiService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.swapiService.getPeople().pipe(
      take(1),
      map(data => {
        return data;
      })
    );
  }
}
