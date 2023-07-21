import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';

//import { environment } from '../directives'
import { User , CrateUserDTO } from '../interfaces/users.interface'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products/'

  constructor(
    private http: HttpClient
  ) { }


    create(dto:CrateUserDTO){
      return this.http.post(this.apiUrl, dto)
    }

    getAll(dto:CrateUserDTO){
      return this.http.get<User[]>(this.apiUrl);
    }
}
