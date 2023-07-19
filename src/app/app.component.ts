import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  varPadre = ''


  recibirMensaje(mensaje:string):void {
    this.varPadre = mensaje;

  }
}
