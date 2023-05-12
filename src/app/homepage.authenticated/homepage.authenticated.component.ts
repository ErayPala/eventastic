import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage.authenticated',
  templateUrl: './homepage.authenticated.component.html',
  styleUrls: ['./homepage.authenticated.component.scss']
})
export class HomepageAuthenticatedComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  test: any = {};

  ngOnInit() {
      this.http.get<any[]>('http://localhost:8080/api/getEvents').subscribe(data => {
          this.test = data;
          console.log(data)
      })
  }
}
