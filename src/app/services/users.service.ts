import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';


//import { environment } from '../directives'
import { User , CrateUserDTO } from '../interfaces/users.interface'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/users/'


  constructor(
    private http: HttpClient
  ) { }


    create(dto:CrateUserDTO){
      return this.http.post<User>(this.apiUrl, dto)
    }

    getAll(dto:CrateUserDTO){
      return this.http.get<User[]>(this.apiUrl);
    }
}
