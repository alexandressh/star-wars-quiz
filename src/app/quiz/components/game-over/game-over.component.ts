import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef,
    private quizService: QuizService
  ) { }

  ngOnInit() {  }

  onSubmit() {
    this.bsModalRef.hide();
  }

}
