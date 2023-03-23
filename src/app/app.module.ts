import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrierungComponent } from './registrierung/registrierung.component';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';
import { HttpClientModule } from "@angular/common/http";
import { ErstellenComponent } from './erstellen/erstellen.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

const meineRouten:Routes = [
  {path: '', component: HomepageComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'erstellen', component: ErstellenComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'anmeldung', component: AnmeldungComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccountComponent,
    HomepageComponent,
    RegistrierungComponent,
    AnmeldungComponent,
    ErstellenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterModule.forRoot(meineRouten)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
