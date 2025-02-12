import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { filter, switchMap, tap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirmDialog/confirmDialog.component';




@Component({
  selector: 'app-new-page',
  standalone: false,

  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  constructor
    (
      private service: HeroesService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private snackbar: MatSnackBar,
      private dialog: MatDialog
    ) { }


  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.MarvelComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  get CurrentHero(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  ngOnInit(): void {

    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.service.getHeroById(id)), //! 'id' apunta a la url en este caso http://localhost:4200/heroes/edit/dc-superman <= id => dc-superman.

    ).subscribe(hero => {

      if (!hero) return this.router.navigateByUrl('/');

      this.heroForm.reset(hero);//! Reiniciamos el form y le pasamos nueva data. de lo contrario tendriamos que rellenar el form manualmente.
      return

    })

  }


  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel',
      desc: 'Marvel - Comics'
    },
  ];

  onsubmit(): void {

    if (this.heroForm.invalid) return;

    if (this.CurrentHero.id) {
      this.service.updateHero(this.CurrentHero).subscribe(hero => {
        this.showSnackbar(`${hero.superhero} updated!`)
      });

      return;

    }


    this.service.addHero(this.CurrentHero).subscribe(hero => {
      // TODO: mostrar snackbar y navegar
      this.router.navigate(['/heroes/edit/', hero.id]);
      this.showSnackbar(`${hero.superhero} created!`);


    })

  }

  // readonly dialog = inject(MatDialog);

  onDeleteHero(): void {


    if (!this.CurrentHero.id) throw Error('Hero id is required')

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });
    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result === true),
        switchMap(() => this.service.deleteHeroById(this.CurrentHero.id)),
        // tap(wasDeleted => console.log({wasDeleted})),
        filter((wasDeleted: boolean) => wasDeleted === true),

      )
      .subscribe(() => {
        this.router.navigate(['/heroes'])
      })
  }
  // dialogRef.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
  //   if (!result) return;
  //   this.service.deleteHeroById(this.CurrentHero.id).subscribe(
  //     wasDeleted => {
  //       if (wasDeleted) {
  //         this.router.navigate(['/heroes'])
  //       }
  //     }
  //   )
  // });



  showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    })
  }

}



