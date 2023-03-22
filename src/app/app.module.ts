import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderNKBComponent } from './header-nkb/header-nkb.component';
import { HeaderKBComponent } from './header-kb/header-kb.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AnmeldenComponent } from './anmelden/anmelden.component';

const meineRouten:Routes = [
{path: 'footer', component: FooterComponent},
{path: 'header-nkb', component: HeaderNKBComponent},
{path: '', component: HeaderNKBComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderNKBComponent,
    HeaderKBComponent,
    FooterComponent,
    AccountComponent,
    AnmeldenComponent
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
