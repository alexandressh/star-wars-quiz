import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  players: any;

  constructor(
    private quizService: QuizService
  ) { }

  ngOnInit() {
    const playersInfo = this.quizService.retrieveUserInfo();
    this.players = Object.keys(playersInfo).map(key => {
      return {
        date: key,
        name: playersInfo[key].name,
        email: playersInfo[key].email,
        points: playersInfo[key].points
      }
    })

  }

}
