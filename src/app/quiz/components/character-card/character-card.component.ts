import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Character } from 'src/app/models/character';
import { CharacterDetailsComponent } from '../character-details/character-details.component';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {
  @Input() character: Character;

  nameGuess: string;
  isDisabled = false;
  bsModalRef: BsModalRef;
  imgLocation: string;

  constructor(
    private modalService: BsModalService,
    private quizService: QuizService
  ) { }

  ngOnInit() { 
    const imgIndex = this.character.index - 9;
    this.imgLocation = `/assets/imgs/${imgIndex}.jpg`;

    if(this.character.points === 0) {
      this.nameGuess = this.character.name;
      this.isDisabled = true;
    }
  }


  nameChanged(event) {
    this.nameGuess = event;
    if(this.nameGuess === this.character.name) {
      this.quizService.correctGuess(this.character.index);
      this.isDisabled = true;
    }
  }

  moreInfo() {
    const initialState = { character: this.character }
    this.bsModalRef = this.modalService.show(CharacterDetailsComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';

    this.quizService.detailsConsulted(this.character.index);
  }

}
