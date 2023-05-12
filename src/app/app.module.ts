//Here are the basic modules from Angular implemented
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Here are modules implemented, which help the developer to add extra features to the app, e.g. the "RouterModule" or the "HttpClientModule"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticateGuardService } from './authenticate.guard.service';

//Here are all components, which were created through "ng g c ..."
import { AccountComponent } from './account/account.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HomepageAuthenticatedComponent } from './homepage.authenticated/homepage.authenticated.component';
import { RegistrierungComponent } from './registrierung/registrierung.component';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErstellenComponent } from './erstellen/erstellen.component';
import { EventComponent } from './event/event.component';

//Here are all modules included, which were importet by Angular Material Design
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

//Here is Routing which makes it possible to navigate on the website
const meineRouten:Routes = [
  {path: 'homepage', component: HomepageAuthenticatedComponent, canActivate: [AuthenticateGuardService]},
  {path: 'erstellen', component: ErstellenComponent, canActivate: [AuthenticateGuardService]},
  {path: 'event', component: EventComponent, canActivate: [AuthenticateGuardService]},
  {path: 'account', component: AccountComponent, canActivate: [AuthenticateGuardService]},
  //Those components can be used, even though the user is not logged in
  {path: '', component: HomepageComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'registrierung', component: RegistrierungComponent},
  {path: 'anmeldung', component: AnmeldungComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    HomepageAuthenticatedComponent,
    RegistrierungComponent,
    AnmeldungComponent,
    AccountComponent,
    ErstellenComponent,
    EventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(meineRouten),
    BrowserAnimationsModule,
    HttpClientModule,
    //From here again are the appropriate imports for Angular Material Design
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatMenuModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
