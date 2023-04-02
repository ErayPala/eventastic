import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  showPersoenlicheDaten = true;
  showMeineEvents = false;
  showPasswortAendern = false;

  showRegister = [0, 1, 2];
}
