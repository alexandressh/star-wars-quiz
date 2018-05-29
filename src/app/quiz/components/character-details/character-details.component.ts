import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Character } from 'src/app/models/character';
import { SwapiService } from '../../../services/swapi.service';
import { forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  imgLocation: string;
  character: Character;
 
  homeworld$: Observable<string>;
  films$: Observable<string>;;
  species$: Observable<string>;
  starships$: Observable<string>;
  vehicles$: Observable<string>;
  

  constructor(
    public bsModalRef: BsModalRef,
    private swapiService: SwapiService
  ) {}
 
  ngOnInit() {
    if(!this.character) {
      return;
    }
    const {films, species, starships, vehicles} = this.character;

    this.homeworld$ = this.swapiService.getGeneralPageRequest(this.character.homeworld);
    this.films$ = this.swapiService.getArrayOfGeneralPages(films);
    this.species$ = this.swapiService.getArrayOfGeneralPages(species);
    this.starships$ = this.swapiService.getArrayOfGeneralPages(starships);
    this.vehicles$ = this.swapiService.getArrayOfGeneralPages(vehicles);
  }

}
