import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }

  abmeldung(){
    return this.http.get(`http://localhost:8080/api/abmeldung`, {}).subscribe(() => {
      this.cookieService.delete('jwt');

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 100);
    });
  }
}
