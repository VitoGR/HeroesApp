import { environments } from './../../../environments/enviroments';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environments.baseUrl

  private user?: User;

  constructor(private http: HttpClient) { }

  getCurrentUser(): User | undefined {

    if (!this.user) return

    return structuredClone(this.user);

  }

  login(email: string, password: string): Observable<User> {

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        // tap(user => localStorage.setItem('token', user.id.toString())),
        tap(user => localStorage.setItem('token', 'sesión.iniciada.con.éxito.')),
      );

  }

  checkAuthentication(): Observable<boolean> {

    if (!localStorage.getItem('token')) return of(false)

    const token = localStorage.getItem('token')


    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),//! doble negación !! para conprobar que sí existe el user => user devuelve el usuario => !user niega el usuario => !!user confirma el usuario
        catchError(err => of(false))
      )

  }


  logout() {
    this.user = undefined;
    localStorage.clear()
  }



}
