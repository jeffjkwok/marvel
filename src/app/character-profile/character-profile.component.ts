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
  id: number;
  character: any;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.profileService.getCharacterProfile(this.id).subscribe(character => {
        this.character = character[0];
        console.log('i am printing the character: ', this.character)
      });
    })
  }

}
