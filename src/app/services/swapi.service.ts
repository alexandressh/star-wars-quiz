import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { People } from 'src/app/models/people';

import { map, tap } from 'rxjs/operators';
import * as _ from 'lodash';
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

  getPeople(url: string = `${this.baseUrl}/people/`) {
    return this.http.get<People>(url).pipe(
      map(data => {
        return {
          next: this.removeBaseUrl(data.next),
          previous: this.removeBaseUrl(data.previous),
          count: data.count,
          results: data.results.map(this.mapCharacters.bind(this))
        } as People;
      }),
      tap(data => this.quizService.mapCharacters(data.results))
    );
  }

  private mapCharacters(person): Character {
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
      height: person.height
    } as Character;
  }

  private removeBaseUrl(url): string {
    if(url) {
      return url.replace(/https:..swapi.co./, '');
    }
    return null;
  }

  

}
