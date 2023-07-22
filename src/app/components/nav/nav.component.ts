import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

import { User } from 'src/app/interfaces/users.interface';

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
    this.authService.login("pedro@gmail.com","password")
    .subscribe(rta => {
      this.token = rta.access_token;
      console.log(this.token);
      this.getProfile();
    })
  }

  getProfile() {
    this.authService.profile(this.token)
    .subscribe(user => {
      this.profile = user;
    })
  }

}
