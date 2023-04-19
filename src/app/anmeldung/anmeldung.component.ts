import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-anmeldung',
  templateUrl: './anmeldung.component.html',
  styleUrls: ['./anmeldung.component.scss']
})

export class AnmeldungComponent {
  //Für das Password
  hide = true;

  constructor(public lg: LoginService) { }
}
