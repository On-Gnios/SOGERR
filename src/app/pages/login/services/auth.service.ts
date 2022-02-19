
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/servicios/local-storage.service';
import { SweetalertService } from 'src/app/servicios/sweetalert.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.API;
  constructor(public SweetalertService: SweetalertService,private http: HttpClient, private LocalStorageService:LocalStorageService, private Router:Router) { }

  sendCredentials(email: string, password: string): Observable<any> {
    const body = {
      controlador: "Usuario",
      operacion: "validarUsuario",
      usuarioNombre:email,
      usuarioClave:password,
      info: navigator.userAgent
    }
    return this.http.post(this.URL, body)
  }

  usuarioLogiado(){
    return this.LocalStorageService.getDatoJson("usuario");
  }

  usuarioLogiadoToken(){
    return this.LocalStorageService.getData("token");
  }

  logout(){
    this.SweetalertService.confirmacion("info", environment.MENSAJES.CERRAR_SESION).then(res=>{
      if (res) {
        this.cerrarSesion().subscribe(res=>{
          if (res.RESPUESTA=="EXITO") {
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

  private cerrarSesion(): Observable<any> {
    const body = {
      controlador: "Usuario",
      operacion: "cerrarSesion",
      token:this.LocalStorageService.getData("token"),
      usuarioID:this.LocalStorageService.getDatoJson("usuario").usuarioID,
      info: navigator.userAgent
    }
    return this.http.post(this.URL, body)
  }
}
