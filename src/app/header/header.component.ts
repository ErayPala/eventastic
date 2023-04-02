import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

    constructor(public lg: LoginService) { }
}
