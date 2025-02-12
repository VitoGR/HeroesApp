import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  standalone: false,

  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sidebarItems =
    [
      { label: 'Listado', icon: 'label', url: './list' },
      { label: 'Agregar', icon: 'add', url: './new-hero' },
      { label: 'Buscar', icon: 'search', url: './search' },
    ]

  constructor(private service: AuthService, private router: Router) { }

  get User():User|undefined{

    return this.service.getCurrentUser();

  }

  onLogout() {
    this.service.logout();
    this.router.navigate(['auth/login'])
  }
}
