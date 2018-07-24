import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component'
import { CharactersComponent } from './characters/characters.component';

import { CharactersService } from './characters.service';
import { CharacterProfileComponent } from './character-profile/character-profile.component';

const ROUTES = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'character/:id',
    component: CharacterProfileComponent
  }

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CharactersComponent,
    HomeComponent,
    CharacterProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [CharactersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
