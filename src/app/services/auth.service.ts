import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpStatusCode } from '@angular/common/http'
import {  catchError  } from 'rxjs/operators';
import { throwError } from 'rxjs';



import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/auth/login'


  constructor(
    private http: HttpClient
  ) { }

  login(email:string, password:string) {
    return this.http.post<Auth>(this.apiUrl,{"email":email, "password":password})
    .pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 500) {
        return throwError('Ups, Halgo está fallando en el servidor')

      }
      if (error.status === HttpStatusCode.NotFound) {// Seria un error 404
        return throwError('Ups, El producto no existe')

      }
      if (error.status === HttpStatusCode.Unauthorized) {// Seria un error 401
        return throwError('Ups, No estás autorizado')

      }
        return throwError('Ups, ha habido un error')

    }));
  }

  profile() {
    return this.http.get(this.apiUrl)
  }
}
