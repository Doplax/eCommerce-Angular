import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { switchMap, tap } from 'rxjs/operators';



//import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.model';
import { User } from '../interfaces/users.interface';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private apiUrl = 'https://api.escuelajs.co/api/v1/auth'


  constructor(
    private http: HttpClient,
    private tokenService:TokenService
  ) { }

  login(email:string, password:string) {
    return this.http.post<Auth>(this.apiUrl+'/login',{"email":email, "password":password})
    .pipe(
      tap(reasponse => this.tokenService.saveToken(reasponse.access_token))
      )

  }

  getProfile() {
    //Fomra 1 de mandar headers
    //const headers = new Headers();
    //headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(this.apiUrl+'/profile',{
      //Fomra 2 de mandar headers
      //headers: { "Authorization": `Bearer ${token}`}
    })
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile()),
    )
  }
}
