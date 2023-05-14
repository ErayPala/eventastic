import { Component } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  constructor(private http: HttpClient, private router: Router, private CookieService: CookieService, private AuthenticateService: AuthenticateService) { }

  showPersoenlicheDaten = true;
  showMeineEvents = false;
  showPasswortAendern = false;

  showRegister = [0, 1, 2];

  abmeldung(): void {
    this.AuthenticateService.abmeldung();
  }
}
