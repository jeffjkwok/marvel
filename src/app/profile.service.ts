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

}
