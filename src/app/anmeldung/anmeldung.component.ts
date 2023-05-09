import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const baseUrl = "http://localhost:8080/"

@Component({
  selector: 'app-anmeldung',
  templateUrl: './anmeldung.component.html',
  styleUrls: ['./anmeldung.component.scss']
})

export class AnmeldungComponent implements OnInit {
  //For the password
  hide = true;

  AnmeldungForm: FormGroup;

  constructor(private http: HttpClient, private router: Router) { }

  serverAntwort: any;

  ngOnInit(): void {
      this.AnmeldungForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      });
  }

  //here are still things missing (token, jwt)
  submit(): void {
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(this.AnmeldungForm.getRawValue());
    this.http.post(baseUrl + 'api/anmeldung', body, { 'headers': headers }).subscribe((response: any) => {
    console.log(response);
     this.serverAntwort = response.message;
     this.router.navigate(['/anmeldung'], {state: {serverAntwort: this.serverAntwort}});
    },
     (error) => {
      console.log(error);
      this.serverAntwort = error.error.message;
     },
    );
  }
}
