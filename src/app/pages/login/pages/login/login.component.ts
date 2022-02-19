import { Route } from '@angular/compiler/src/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FrasesDeMotivacionService } from 'src/app/servicios/frases-de-motivacion.service';
import { LocalStorageService } from 'src/app/servicios/local-storage.service';
import { SweetalertService } from 'src/app/servicios/sweetalert.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
import {NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public cliente = environment.EMPRESA_CLIENTE_NOMBRE;
  public frase;
  errorSession: boolean = false
  formLogin;
  validation_messages = {
    'email': [
      { type: 'required', message: 'email es requerido.' },
      { type: 'email', message: 'email es invalido.' }
    ],
    'password': [
      { type: 'required', message: 'Contraseña es requerida.' }
    ]
  };

  constructor(private spinner: NgxSpinnerService, public SweetalertService: SweetalertService ,private fb: FormBuilder,public FrasesDeMotivacionService:FrasesDeMotivacionService,private authService: AuthService, private LocalStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit(){

    this.frase = this.FrasesDeMotivacionService.getFrase();
    this.formLogin = this.fb.group (
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('',
          [
            Validators.required/* ,
            Validators.minLength(6),
            Validators.maxLength(12) */
          ])
      }
    )
  }

  sendLogin(): void {
    /* this.spinner.show("login"); */
    const { email, password } = this.formLogin.value
    this.authService.sendCredentials(email, password)
      //TODO: 200 <400
      .subscribe(response => { //TODO: Cuando el usuario credenciales Correctas ✔✔
        /* this.spinner.hide("login"); */
        if (response.RESPUESTA=="EXITO") {
          this.LocalStorageService.postData('token', response.DATOS.TOKEN);
          this.LocalStorageService.postDatoJson('usuario', response.DATOS.USUARIO);
          this.router.navigateByUrl("/");
          return;
        }

        this.SweetalertService.modal("info",response.MENSAJE);

      },
        err => {//TODO error 400>=
          this.spinner.hide();
          this.errorSession = true
          this.SweetalertService.modal("error",environment.MENSAJES.ERROR);
          console.log(err);

        })
  }

}
