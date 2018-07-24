import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeaderComponent } from '../header/header.component';

import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-character-profile',
  templateUrl: './character-profile.component.html',
  styleUrls: ['./character-profile.component.css']
})
export class CharacterProfileComponent implements OnInit {

  private sub: any;
  character: any;
  allDataFetched: boolean;
  medium: any;
  related: any = [];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.profileService.getCharacterProfile(id).subscribe(character => {
        this.character = character[0];
        this.findRelatedCharacters();
        this.allDataFetched = true;
      });
    })

  }

  findRelatedCharacters(){
    let query;

    if(this.character.comics.items){
      query = 'comics';
    }
    else if (this.character.series.items){
      query = 'series';
    }
    else if(this.character.events.items){
      query = 'events';
    }
    else if(this.character.stories.items){
      query = 'stories';
    }

    this.profileService.getRelatedCharacters(this.character.id, 'comics').subscribe(result => {
      this.medium = result;
      let random = Math.floor(Math.random()*this.medium.length);
      this.related = result[random].characters.items;
      console.log(this.medium)
    })

  }


}
