import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor( private http: HttpClient) { }

  loadCharacters() {
    return this.http.get('http://localhost:3000/api/characters')
      .pipe(map(res => res));
  }

  loadNewCharacters(offset){
    return this.http.get('http://localhost:3000/api/characters/' + offset)
      .pipe(map(res => res ));
  }



}
