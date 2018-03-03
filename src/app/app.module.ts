import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PrivatePageComponent } from './components/private-page/private-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { VenuesComponent } from './components/venues/venues.component';
import { VenuesService } from './services/venues.service';
import { EventService } from './services/event.service';
import { SectionService } from './services/section.service';
import { ConfigurationService } from './services/configuration.service';
import { EventInformationService } from './services/event-information.service';
import { AddVenueComponent } from './components/add-venue/add-venue.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddConfigurationsComponent } from './components/add-configurations/add-configurations.component';
import { AddSectionComponent } from './components/add-section/add-section.component';
import { SectionsComponent } from './components/sections/sections.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    RegisterPageComponent,
    LoginPageComponent,
    PrivatePageComponent,
    NotFoundPageComponent,
    VenuesComponent,
    AddVenueComponent,
    AddEventComponent,
    AddConfigurationsComponent,
    AddSectionComponent,
    SectionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FlashMessagesModule,
    NgSelectModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    FlashMessagesService,
    VenuesService,
    EventService,
    EventInformationService,
    ConfigurationService,
    SectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
