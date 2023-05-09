import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';

//Hier sind alle von uns erstellten Komponenten durch ng g c ...
import { AccountComponent } from './account/account.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrierungComponent } from './registrierung/registrierung.component';
import { AnmeldungComponent } from './anmeldung/anmeldung.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErstellenComponent } from './erstellen/erstellen.component';
import { EventComponent } from './event/event.component';

//Hier sind alle Module von Angular Material Desgin importiert

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

const meineRouten:Routes = [
  {path: '', component: HomepageComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'registrierung', component: RegistrierungComponent},
  {path: 'anmeldung', component: AnmeldungComponent},
  {path: 'erstellen', component: ErstellenComponent},
  {path: 'event', component: EventComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'account', component: AccountComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
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
    //Ab hier sind wieder die zugehörigen imports für Angular Material Design
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
