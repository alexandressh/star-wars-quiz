import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { SwapiService } from '../services/swapi.service';
import { Character } from '../models/character';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { QuizService } from 'src/app/services/quiz.service';
import { Subscription } from 'rxjs';
import { GameOverComponent } from './components/game-over/game-over.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  characters: Character[];
  previousPage: string;
  nextPage: string;
  currentPage: number = 1;
  totalItems: number;
  bsModalRef: BsModalRef;
  
  gameOverSubscription: Subscription;

  constructor(
    private swapiService: SwapiService,
    private quizService: QuizService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    const gameOverObserver = this.quizService.startGame();
    this.gameOverSubscription = gameOverObserver.subscribe(this.gameOverEvent.bind(this));
    this.swapiService.getPeople().subscribe(data => this.mapNewPage(data));
  }

  ngOnDestroy() {
    
  }

  pageChanged(event) {
    let url = null;
    if(event.page > this.currentPage) {
      this.swapiService.getPeople(this.nextPage).subscribe(data => this.mapNewPage(data));
    } else if (event.page < this.currentPage) {
      this.swapiService.getPeople(this.previousPage).subscribe(data => this.mapNewPage(data));
    }
  }

  private mapNewPage(data) {
    this.totalItems = data.count
    this.previousPage = data.previous;
    this.nextPage = data.next;
    this.characters = data.results;
  }

  private gameOverEvent(points: number) {
    const initialState = { points: points }
    this.bsModalRef = this.modalService.show(GameOverComponent, { initialState });
  }
}
