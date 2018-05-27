import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  closeBtnName: string;
  character: Character;
 
  constructor(public bsModalRef: BsModalRef) {}
 
  ngOnInit() {
  }

}
