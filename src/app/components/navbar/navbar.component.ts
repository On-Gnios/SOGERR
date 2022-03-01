import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/login/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  usuarioName;
  usuarioAVATAR;
  constructor(location: Location,  private element: ElementRef, private router: Router, public AuthService:AuthService) {
    this.location = location;
  }

  ngOnInit() {
    let user = this.AuthService.usuarioLogiado();
    this.usuarioName= user.personaRAZONSOCIAL;
    this.usuarioAVATAR= user.usuarioAVATAR;

    if (!this.usuarioAVATAR) {
      this.usuarioAVATAR = "assets/img/theme/user.png";
    }

    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  Logout(){
    this.AuthService.logout();
  }

}
