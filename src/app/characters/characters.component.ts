import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  data: any;
  characters: any = [];
  characterRows: any = [];
  allDataFetched: boolean = false;
  pages: any;


  constructor( private charactersService: CharactersService) { }

  ngOnInit() {

    this.charactersService.loadCharacters()
      .subscribe(result => {

        this.data = result;
        this.allDataFetched = true;
        this.characters = this.data.results;

        this.createCharRows();

        if(this.data){
          let totalPages = Math.ceil(this.data.total/20);
          this.pages = Array(totalPages).fill(0).map((x, i) => i);
        }

      });

  };

  loadNewCharacters(e){
    e.preventDefault();
    let offset = Number(e.target.id);

    this.charactersService.loadNewCharacters(offset).subscribe(result => {
      this.characters = result;
      this.characterRows = [];
      this.createCharRows();
    });
  }

  createCharRows(){
    let count = 0;
    let row: any = [];

    if(this.characters){
      for(let char of this.characters){
        row.push(char)
        count++;
        if(count == 5 || char == this.characters[this.characters.length-1]){
          this.characterRows.push(row);
          count = 0;
          row = [];
        }
      }
    }
  }
}
