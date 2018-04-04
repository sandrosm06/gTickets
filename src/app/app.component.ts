import { Component } from '@angular/core';
import {Ng5BreadcrumbModule, BreadcrumbService} from 'ng5-breadcrumb';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private breadcrumbService: BreadcrumbService) {
    
    breadcrumbService.addFriendlyNameForRoute('/', 'Home');
    breadcrumbService.addFriendlyNameForRoute('/private', 'Gestion');
    breadcrumbService.addFriendlyNameForRoute('/venues', 'Lugares');
    breadcrumbService.addFriendlyNameForRoute('/add-venue', 'Agregar Lugar');
    breadcrumbService.addFriendlyNameForRouteRegex('/add-event/:idVenue', 'Agregar Evento');
    breadcrumbService.addFriendlyNameForRouteRegex('/add-configurations/[0-9]', 'Agregar Localidades');
    




  }
}



