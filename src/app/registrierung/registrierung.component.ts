import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrierung',
  templateUrl: './registrierung.component.html',
  styleUrls: ['./registrierung.component.scss']
})

export class RegistrierungComponent implements OnInit {
  //Für das Password
  hide = true;

  RegistrierungForm: FormGroup;

  constructor(private http: HttpClient, private router: Router) { }

  serverAntwort: any;

  ngOnInit(): void {
    this.RegistrierungForm = new FormGroup(
      {
        vorname: new FormControl('', [Validators.required]),
        nachname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      });
  }

  registrierung(): void {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(this.RegistrierungForm.getRawValue());

    this.http.post('http://localhost:8080/api/registrierung', body, { 'headers': headers }).subscribe((response) => {
      console.log(response);
      this.serverAntwort = response;
      this.router.navigate(['/anmeldung'], { state: { serverAntwort: this.serverAntwort } });
    },
      (error) => {
        console.log(error);
        this.serverAntwort = error.error.message;
      },
    );
  }
}
