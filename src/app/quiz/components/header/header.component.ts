import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  time: string;

  constructor(
    private quizService: QuizService
  ) { }

  ngOnInit() {
    this.quizService.timeSubscription().subscribe(
      (data) => this.time = data
    );
  }

}
