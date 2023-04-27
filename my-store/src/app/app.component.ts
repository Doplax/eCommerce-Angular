import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public name = 'Pol';
  public age = 26;
  img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png'
  btnDisabled = true;
  person = {
    name : 'Pedro',
    age : 44,
    img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
  }
  public toggleButton() {
    this.btnDisabled = !this.btnDisabled;
  }

  public increaseAge() {
    this.person.age = this.person.age + 1;
  }

  onScroll(event:Event) {
    const element = event.target as HTMLElement;
    console.log(element.scrollTop);
  }

  changeName(event:Event){
    const nameValue = event.target as HTMLInputElement;
    this.person.name = nameValue.value
  }
}
