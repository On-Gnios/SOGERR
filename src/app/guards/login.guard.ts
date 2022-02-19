import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../pages/login/services/auth.service';
import { SweetalertService } from '../servicios/sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private AuthService: AuthService,
    private Router: Router,
    private SweetalertService:SweetalertService
    ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkSession();
  }

  checkSession(): boolean {
    try {
      const token: boolean = !!this.AuthService.usuarioLogiadoToken();
      if (token) {
        this.Router.navigateByUrl("/");
      }
      return true;
    } catch (e) {
      this.SweetalertService.modal("error", environment.MENSAJES.ERROR);
      console.log('Algo sucedio ?? 🔴', e);
      return false
    }

  }

}
