import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-homepage.authenticated',
  templateUrl: './homepage.authenticated.component.html',
  styleUrls: ['./homepage.authenticated.component.scss']
})
export class HomepageAuthenticatedComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private CookieService: CookieService, private AuthenticateService: AuthenticateService) { }

  Eventdaten = new Array<any>();

  ngOnInit() {
      this.http.get<any[]>('http://localhost:8080/api/getEvents').subscribe(data => {
          this.Eventdaten = data;
          console.log(data)
      })
  }

  abmeldung(): void {
    this.AuthenticateService.abmeldung();
  }
}
