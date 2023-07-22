import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'



import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.model';
import { User } from '../interfaces/users.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/auth'


  constructor(
    private http: HttpClient
  ) { }

  login(email:string, password:string) {
    return this.http.post<Auth>(this.apiUrl+'/login',{"email":email, "password":password})
  }

  profile(token:string) {
    //Fomra 1 de mandar headers
    //const headers = new Headers();
    //headers.set('Authorization', `Bearer ${token}`);


    return this.http.get<User>(this.apiUrl+'/profile',{
      //Fomra 2 de mandar headers

      headers: { "Authorization": `Bearer ${token}`}

    })
  }
}
