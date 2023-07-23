import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

import { User } from 'src/app/interfaces/users.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService

  ) {

  }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    })
  }

  toggleMenu(): void {
    this.activeMenu = !this.activeMenu;
  }

  login(){
    //this.authService.login("pedro@gmail.com","password")
    //.subscribe(rta => {
    //  this.token = rta.access_token;
    //  console.log(this.token);
    //  this.getProfile();
    //})

    this.authService.loginAndGet("john@mail.com","changeme")
    .subscribe(user => {
      this.profile = user;
      console.log(user);
      //this.token = '---'
    })
  }

  //getProfile() {
  //  this.authService.getProfile()
  //  .subscribe(user => {
  //    this.profile = user;
  //  })
  //}



}
