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

const meineRouten:Routes = [
  {path: '', component: HeaderComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'footer', component: FooterComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccountComponent,
    HomepageComponent,
    RegistrierungComponent,
    AnmeldungComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(meineRouten)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
