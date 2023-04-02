import { Injectable } from '@angular/core';
import { RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  angemeldet = false;

  constructor() { }
}
