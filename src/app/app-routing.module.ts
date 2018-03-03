import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from  './components/register-page/register-page.component';
import { PrivatePageComponent } from './components/private-page/private-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { VenuesComponent } from './components/venues/venues.component';
import { AddVenueComponent } from './components/add-venue/add-venue.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AuthGuard } from './guards/auth.guard';
import { AddConfigurationsComponent } from './components/add-configurations/add-configurations.component';
import { AddSectionComponent } from './components/add-section/add-section.component';
import { SectionsComponent } from './components/sections/sections.component';
import { AddRowsComponent } from './components/add-rows/add-rows.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'private', component: PrivatePageComponent, canActivate: [AuthGuard]},
  {path: 'venues', component: VenuesComponent, canActivate: [AuthGuard]},
  {path: 'add-venue', component: AddVenueComponent, canActivate: [AuthGuard]},
  {path: 'add-event/:idVenue', component: AddEventComponent, canActivate: [AuthGuard]},
  {path: 'add-configurations/:idEvent', component: AddConfigurationsComponent, canActivate: [AuthGuard]},
  {path: 'add-sections/:idEvent', component: AddSectionComponent, canActivate: [AuthGuard]},
  {path: 'add-rows/:idEvent', component: AddRowsComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
