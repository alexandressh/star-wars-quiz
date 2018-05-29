import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Character } from '../models/character';
import { People } from 'src/app/models/people';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  timingSubject = new Subject<string>();
  gameOverSubject = new Subject<number>();

  private timerId;
  private time = 0;
  private points = 0;
  private mappedPeoplePages = {};
  private mappedGeneralPages = {};

  constructor() { }

  startGame(): Observable<number> {
    this.points = 0;
    this.mappedPeoplePages = {};
    this.timerId = setInterval(this.emitTime.bind(this), 1000);
    return this.gameOverSubject;
  }

  mapGeneralPage(url: string, data): void {
    this.mappedGeneralPages[url] = data;
  }

  isGeneralPageAlreadyMapped(url: string): boolean {
    return !!this.mappedGeneralPages[url];
  }

  getGeneralPage(page: string): any {
    if (this.isGeneralPageAlreadyMapped(page)) {
      return this.mappedGeneralPages[page];
    }
  }
  
  mapPeoplePages(page: number, people: People): void {
    this.mappedPeoplePages[page] = people;
  }

  isPeoplePageAlreadyMapped(page: number): boolean {
    return !!this.mappedPeoplePages[page];
  }

  getPeoplePage(page: number): People {
    if(this.isPeoplePageAlreadyMapped(page)) {
      return this.mappedPeoplePages[page];
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

  saveUserInfo(name: string, email: string, points: number) {
    console.log(name, email, points);
  }

  private getCharacterFromPages(charIndex: number): Character {
    const pageNumber = Math.floor(charIndex / 10);
    const index = (charIndex % 10);

    const page = this.mappedPeoplePages[pageNumber];
    return page.results[index];
  }

  private emitTime() {
    this.time++;

    if(this.time >= 20) {
      clearInterval(this.timerId);
      this.timingSubject.next(`00:00`);
      this.trigerGameOverEvent();
      return;
    }

    const min = 1 - Math.floor(this.time / 60);
    const sec = 60 - this.time % 59;
    const secFormated = sec < 10 ? `0${sec}` : sec;

    this.timingSubject.next(`0${min}:${secFormated}`);
  }

  private trigerGameOverEvent() {
    this.gameOverSubject.next(this.points);
  }
}
