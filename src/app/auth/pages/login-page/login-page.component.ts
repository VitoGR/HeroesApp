import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: false,

  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  constructor(private service: AuthService,
    private router: Router
  ) { }

  public onLogin(): void {
    this.service.login('fernando@mail.com', '123')
    .subscribe(user => {
      this.router.navigate(['/']);
    });
  }

}
