import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

    constructor(private http: HttpClient, private router: Router) { }

    Eventdaten = new Array<any>();

  ngOnInit() {
      this.http.get<any[]>('http://localhost:8080/api/getEvents').subscribe(data => {
          this.Eventdaten = data;
          console.log(data)
      })
  }

}