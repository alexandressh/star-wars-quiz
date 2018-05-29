import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {
  points: number;
  name: string;
  email: string;
  isDarkSide: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    private quizService: QuizService,
    private router: Router
  ) { }

  ngOnInit() { 
    this.isDarkSide = this.points && this.points < 50;
   }

  saveInfo() {
    this.quizService.saveUserInfo(this.name, this.email, this.points);
    this.router.navigate(['home']);
    this.bsModalRef.hide();
  }

}
