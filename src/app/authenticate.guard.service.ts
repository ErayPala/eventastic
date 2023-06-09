import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuardService implements CanActivate {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authenticate: AuthenticateService
  ) { }

  canActivate(): boolean {
  const token = this.cookieService.get('jwt');

    if (!token) {
      this.router.navigate(['/homepage']);
      return false;
    }

    return true;
  }
}
