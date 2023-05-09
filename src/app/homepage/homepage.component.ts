import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

constructor(private http: HttpClient, private router: Router) { }

ngOnInit() {
        this.http.get<any[]>('http://localhost:8080/api/test').subscribe(data => {
            console.log(data)
        })
      }
}
