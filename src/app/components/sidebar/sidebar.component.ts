import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/pages/login/services/auth.service';
import { environment } from 'src/environments/environment';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/recoleccion', title: 'Recoleccion',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  CLIENTE_LOGO_SIDEBAR = environment.CLIENTE_LOGO_SIDEBAR;

  constructor(private router: Router, config: NgbAccordionConfig, private AuthService:AuthService) {
    config.closeOthers = true;
    config.animation = true;

  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  logout(){
    this.AuthService.logout();
  }

  public beforeChange($event) {
    console.log($event);


    if ($event.panelId === 'ngb-panel-0') {
      $event.preventDefault();
    }

  }
}
