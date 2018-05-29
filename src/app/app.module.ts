import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { CharacterCardComponent } from './quiz/components/character-card/character-card.component';
import { CharacterDetailsComponent } from './quiz/components/character-details/character-details.component';
import { GameOverComponent } from './quiz/components/game-over/game-over.component';
import { RankingComponent } from './ranking/ranking.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './quiz/components/header/header.component';
import { SwapiService } from './services/swapi.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    CharacterCardComponent,
    CharacterDetailsComponent,
    GameOverComponent,
    RankingComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    SwapiService
  ],
  entryComponents: [
    CharacterDetailsComponent,
    GameOverComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
