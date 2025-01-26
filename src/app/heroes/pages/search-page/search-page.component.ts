import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  standalone: false,

  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  constructor(private service: HeroesService) { }


  searchInput = new FormControl('');

  public heroes: Hero[] = [];

  public selectedHero?:Hero;

  searchHero() {

    const value: string = this.searchInput.value || '';

    this.service.getSuggestions(value).subscribe(heroes => this.heroes = heroes);
  }

  onSelectedOption(event: MatAutocompleteActivatedEvent){

    if(!event.option?.value){
      this.selectedHero = undefined;
      return;
    }

    const hero:Hero = event.option.value;

    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;

  }

}
