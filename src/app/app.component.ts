import { Component } from '@angular/core';

import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  token = '';

  constructor(
    private usersService: UsersService,
    private filesService: FilesService
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


  downloadPdf(){
    this.filesService.getFile('my.pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'aplication/pdf')
    .subscribe()
  }

}
