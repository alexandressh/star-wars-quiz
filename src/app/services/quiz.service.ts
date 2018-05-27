import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  timingSubject = new Subject<string>();

  private timerId;
  private time = 0;
  private points = 0;
  private mappedCharacters = {};

  constructor() { }

  startGame() {
    this.points = 0;
    this.mappedCharacters = {};
    this.timerId = setInterval(this.emitTime.bind(this), 1000);

  }

  mapCharacters(characters: Character[]) {
    const mapCharactersToPoints = this.mapCharactersToPoints.bind(this);
    this.mappedCharacters = characters.reduce(mapCharactersToPoints, this.mappedCharacters);
  }

  correctGuess(name: string) {
    const validPoints = this.mappedCharacters[name];
    this.points += validPoints;
  }

  detailsConsulted(name: string) {
    this.mappedCharacters[name] = 5;
  }

  timeSubscription() {
    return this.timingSubject.asObservable();
  }

  private emitTime() {
    this.time++;

    if(this.time >= 120) {
      this.timerId.clear();
      this.timingSubject.next(`00:00`);
      return;
    }

    const min = 1 - Math.floor(this.time / 60);
    const sec = 60 - this.time % 59;
    const secFormated = sec < 10 ? `0${sec}` : sec;

    this.timingSubject.next(`0${min}:${secFormated}`);
  }

  private mapCharactersToPoints(acc, cur) {
    const {name} = cur;
    if(!acc[name]) {
      acc[name] = 10;
    }
    return acc;
  }


}
