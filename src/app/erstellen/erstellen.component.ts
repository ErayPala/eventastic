import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

const baseUrl = "http://localhost:8080/"

@Component({
    selector: 'app-erstellen',
    templateUrl: './erstellen.component.html',
    styleUrls: ['./erstellen.component.scss'],
})

export class ErstellenComponent implements OnInit {

    ErstellungForm: FormGroup;

    constructor(private http: HttpClient, private router: Router) { }

    serverAntwort: any

    ngOnInit() {
        this.http.get<any[]>('http://localhost:8080/api/test').subscribe(data => {
            console.log(data)
        })
        this.ErstellungForm = new FormGroup(
            {
                eventtitel: new FormControl('', [Validators.required]),
                veranstalter: new FormControl('', [Validators.required]),
                typ: new FormControl('', [Validators.required]),
                kategorie: new FormControl('', [Validators.required]),
                adresse: new FormControl('', [Validators.required]),
                stadt: new FormControl('', [Validators.required]),
                bundesland: new FormControl('', [Validators.required]),
                plz: new FormControl('', [Validators.required]),
                land: new FormControl('', [Validators.required]),
                eventbeginn: new FormControl('', [Validators.required]),
                startzeit: new FormControl('', [Validators.required]),
                eventende: new FormControl('', [Validators.required]),
                uhrzeit: new FormControl('', [Validators.required]),
            }
        )
    }

    submit() {

        console.log('Submit Funzt')

        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(this.ErstellungForm.getRawValue);
        // const body = JSON.stringify({message: "Digga"});
        console.log(this.ErstellungForm);
        this.http.post('http://localhost:8080/api/erstellen', body, { headers: headers }).subscribe((response) => {
            console.log(response);
            this.serverAntwort = response;
            // this.router.navigate(['/erstellen'], {state: {serverAntwort: this.serverAntwort}});
        },
            (error) => {
                console.log(error);
                this.serverAntwort = error.error.message;
            },
        );
    }
}