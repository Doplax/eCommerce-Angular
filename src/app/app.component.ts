import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  token = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ){

  }

  createUser(){
    this.usersService.create({
      "name": "Pedro",
      "email": "pedro@gmail.com",
      "password": "password",
      "avatar": "https://pi.lorem.space/image/face?w=640&h=480&r=867"
    })
    .subscribe(rta => {
      console.log(rta);
    })
  }

  login(){
    this.authService.login("pedro@gmail.com","password")
    .subscribe(rta => {
      this.token = rta.access_token;
    })
  }

  getProfile() {
    this.authService.profile(this.token)
    .subscribe(profile => {
      console.log(profile)
    })
  }
}
