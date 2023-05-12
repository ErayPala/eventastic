import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-anmeldung',
  templateUrl: './anmeldung.component.html',
  styleUrls: ['./anmeldung.component.scss']
})

export class AnmeldungComponent implements OnInit {
  //For the password
  hide = true;

  AnmeldungForm: FormGroup;

  constructor(private http: HttpClient, private router: Router, private CookieService: CookieService) { }

  serverAntwort: any;

  ngOnInit(): void {
      this.AnmeldungForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      });
  }

  //here are still things missing (token, jwt)
  login(): void {

    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(this.AnmeldungForm.getRawValue());
    
      this.http.post('http://localhost:8080/api/anmeldung', body, { 'headers': headers }).subscribe((response: any) => {
      this.CookieService.set('jwt', response.token, {secure: false});
      this.router.navigate(['/']);
    },
     (error) => {
      console.log(error);
      this.serverAntwort = error.error.message;
     },
    );
  }
}
