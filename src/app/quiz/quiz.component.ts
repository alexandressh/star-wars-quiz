import { Component, OnInit } from '@angular/core';

import { SwapiService } from '../services/swapi.service';
import { Character } from '../models/character';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  characters: Character[];
  previousPage: string;
  nextPage: string;
  currentPage: number = 1;
  totalItems: number;
  
  sub;

  constructor(
    private swapiService: SwapiService,
    private quizService: QuizService
  ) { }

  ngOnInit() {
    this.quizService.startGame();
    this.sub = this.swapiService.getPeople().subscribe(data => this.mapNewPage(data));
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
}
