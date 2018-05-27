import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { People } from 'src/app/models/people';
import { QuizService } from './quiz.service';
import { Character } from '../models/character';


@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private baseUrl = 'api';

  constructor(
    private http: HttpClient,
    private quizService: QuizService
  ) { }

  getPeople(url: string = `${this.baseUrl}/people/?page=1`): Observable<People> {
    const pageNumber = this.getPageNumber(url);

    if(this.quizService.isPageAlreadyMapped(pageNumber)) {
      return of(this.quizService.getPage(pageNumber));
    }

    return this.getPeopleRequest(url, pageNumber);
  }

  private getPageNumber(url: string): number {
    if(url && url.indexOf('page=') > 0) {
      const page = url.split('page=')[1];
      return parseInt(page, 10);
    }
  }

  private getPeopleRequest(url: string, pageNumber: number): Observable<People> {
    return this.http.get<People>(url).pipe(
      map(data => {
        return {
          next: this.removeBaseUrl(data.next),
          previous: this.removeBaseUrl(data.previous),
          count: data.count,
          results: data.results.map((data, i) => this.mapCharacters(data, pageNumber, i))
        } as People;
      }),
      tap(data => this.quizService.mapPages(pageNumber, data))
    );
  }

  private mapCharacters(person, page, index): Character {
    const calcIndex = page * 10 + index;
    return {
      homeworld: this.removeBaseUrl(person.homeworld),
      name: person.name,
      vehicles: person.vehicles.map(this.removeBaseUrl.bind(this)),
      starships: person.starships.map(this.removeBaseUrl.bind(this)),
      birth_year: person.birth_year,
      hair_color: person.hair_color,
      species: person.species.map(this.removeBaseUrl.bind(this)),
      mass: person.mass,
      eye_color: person.eye_color,
      films: person.films.map(this.removeBaseUrl.bind(this)),
      gender: person.gender,
      height: person.height,
      points: 10,
      index: calcIndex
    } as Character;
  }

  private removeBaseUrl(url): string {
    if(url) {
      return url.replace(/https:..swapi.co./, '');
    }
    return null;
  }

  

}
