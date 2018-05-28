import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Character } from '../models/character';
import { People } from 'src/app/models/people';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  timingSubject = new Subject<string>();

  private timerId;
  private time = 0;
  private points = 0;
  private mappedPages = {};

  constructor() { }

  startGame() {
    this.points = 0;
    this.mappedPages = {};
    this.timerId = setInterval(this.emitTime.bind(this), 1000);
  }
  
  mapPages(page: number, people: People) {
    this.mappedPages[page] = people;
  }

  isPageAlreadyMapped(page: number): boolean {
    return !!this.mappedPages[page];
  }

  getPage(page: number): People {
    if(this.isPageAlreadyMapped(page)) {
      return this.mappedPages[page];
    }
  }

  correctGuess(charIndex: number) {
    const character = this.getCharacterFromPages(charIndex);
    const { points } = character;

    this.points += points;
    character['points'] = 0;
  }

  detailsConsulted(charIndex: number) {
    const character = this.getCharacterFromPages(charIndex);

    character['points'] = 5;
  }

  timeSubscription() {
    return this.timingSubject.asObservable();
  }

  private getCharacterFromPages(charIndex: number): Character {
    const pageNumber = Math.floor(charIndex / 10);
    const index = (charIndex % 10);

    const page = this.mappedPages[pageNumber];
    return page.results[index];
  }

  private emitTime() {
    this.time++;

    if(this.time >= 119) {
      clearInterval(this.timerId);
      this.timingSubject.next(`00:00`);
      return;
    }

    const min = 1 - Math.floor(this.time / 60);
    const sec = 60 - this.time % 59;
    const secFormated = sec < 10 ? `0${sec}` : sec;

    this.timingSubject.next(`0${min}:${secFormated}`);
  }
}
