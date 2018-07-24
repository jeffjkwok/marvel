import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( private http: HttpClient) { }

  getCharacterProfile(id){
    return this.http.get('http://localhost:3000/api/character/'+id)
      .pipe(map( res => res ));
  };

  getRelatedCharacters(id, query){
    return this.http.get('http://localhost:3000/api/characters/'+ id + '/' + query)
      .pipe(map( res => res ));
  };

}
