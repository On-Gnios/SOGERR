import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageService } from "src/app/servicios/local-storage.service";
import { SweetalertService } from "src/app/servicios/sweetalert.service";
import { environment } from "src/environments/environment";
import { Injectable } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";

@Injectable({
  providedIn: 'root',
})

export abstract class AuthAbstract{

  PROVIDER:string;

  constructor(
    public socialAuthService: SocialAuthService,
    public SweetalertService: SweetalertService,
    public http: HttpClient,
    public LocalStorageService:LocalStorageService,
    public Router:Router
  ) {}

  usuarioLogiado(){
    return this.LocalStorageService.getDatoJson("usuario");
  }

  usuarioLogiadoToken(){
    return this.LocalStorageService.getData("token");
  }

  sendCredentials(providerAuth, providerAuthData, email: string, password: string=''): Observable<any> {
    const body = {
      controlador: "Usuario",
      operacion: "validarUsuario",
      usuarioNombre:email,
      usuarioClave:password,
      providerAuth:providerAuth,
      providerAuthData:providerAuthData,
      validateProviderAuthData : environment.VALIDATE_PROVIDER_AUTH_DATA,
      info: navigator.userAgent
    }
    return this.http.post(environment.API, body)
  }


  logout(){
    this.SweetalertService.confirmacion("info", environment.MENSAJES.CERRAR_SESION).then(res=>{
      if (res) {
        this.logOutInAPI().subscribe(res=>{
          if (res.RESPUESTA=="EXITO") {
            if (this.usuarioLogiado().providerAuth!="LOCAL") {
              this.logOutInProvider();
            };
            this.LocalStorageService.deleteAll();
            this.Router.navigateByUrl("/login");
            return true;
          }
          console.log(res);
          this.SweetalertService.modal("error", environment.MENSAJES.ERROR);
        }, err => {
          this.SweetalertService.modal("error", environment.MENSAJES.ERROR);
          console.log(err);
        });

      }
    });

    return true;
  }

  private logOutInAPI(): Observable<any> {
    const body = {
      controlador: "Usuario",
      operacion: "cerrarSesion",
      token:this.LocalStorageService.getData("token"),
      usuarioID:this.LocalStorageService.getDatoJson("usuario").usuarioID,
      info: navigator.userAgent
    }
    return this.http.post(environment.API, body)
  }

  logOutInProvider(){
    this.socialAuthService.signOut();
  }

}
