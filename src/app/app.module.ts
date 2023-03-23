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

const meineRouten:Routes = [
  {path: '', component: HomepageComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'erstellen', component: ErstellenComponent},
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
    RouterModule.forRoot(meineRouten)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
