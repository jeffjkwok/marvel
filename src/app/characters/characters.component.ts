import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: any = [];
  characterRows: any = [];
  allDataFetched: boolean = false;

  constructor( private charactersService: CharactersService) { }

  ngOnInit() {

    this.charactersService.loadCharacters()
      .subscribe(characters => {

        this.characters = characters;
        this.allDataFetched = true;

        let count = 0;
        let row: any = [];

        for(let char of this.characters){
          row.push(char)
          count++;
          if(count == 5){
            this.characterRows.push(row);
            count = 0;
            row = [];
          }
        }
        // console.log(this.characterRows)
        // console.log(this.characters, 'look at me')
      });

  };

}
