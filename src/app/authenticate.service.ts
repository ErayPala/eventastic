import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  loggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { 
    if (this.cookieService.get('loggedIn') != ''){
      this.loggedIn = true;
    }
  }

  abmeldung(){
    return this.http.get(`http://localhost:8080/api/abmeldung`, {}).subscribe(() => {
      this.cookieService.delete('jwt');
      this.cookieService.delete('loggedIn');
      this.loggedIn = false;

      setTimeout(() => {
        this.router.navigate(['/homepage']);
      }, 100);
    });
  }
}
