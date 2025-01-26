import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  standalone: false,

  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(private service: HeroesService, private activated: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {

    this.activated.params
      .pipe(

        switchMap(({ id }) => this.service.getHeroById(id)),)//toma los params, luego desectructuramos y tomamos algo en concreto, esta vez el 'id'
      .subscribe(hero => {
        if (!hero) return this.router.navigate(['/heroes/list'])

        this.hero = hero;

        console.log({hero})

        return;
      })

  }

  goBack():void{
    this.router.navigateByUrl('/heroes/list')
  }

}

// this.activated.params
//       .pipe(
//         switchMap(({ id }) => this.service.getHeroById(id)),)//toma los params, luego desectructuramos y tomamos algo en concreto, esta vez el 'id'
//       .subscribe(params => console.log({ params }))
