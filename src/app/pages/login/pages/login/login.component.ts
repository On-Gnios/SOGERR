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
import { AuthGoogleService } from '../../services/auth-google.service';
import { AuthFacebookService } from '../../services/auth-facebook.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public cliente = environment.EMPRESA_CLIENTE_NOMBRE;
  public frase;
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
    private router: Router, private AuthGoogleService:AuthGoogleService,  private AuthFacebookService:AuthFacebookService) { }

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
    const { email, password } = this.formLogin.value
    this.sendCredentials("LOCAL", email, password);
  }

  loginWithGoogle(){
    this.AuthGoogleService.loginWithGoogle().then(user=>{
      if (user) {
        console.log(user);
        this.sendCredentials("GOOGLE", user.email, "", user);
      }
    }).catch(error=>{
      this.SweetalertService.modal("error",environment.MENSAJES.ERROR);
      console.log(error);
    });
  }

  loginWithFacebook(){
    this.AuthFacebookService.loginWithFacebook().then(user=>{
      if (user) {
        console.log(user);
        this.sendCredentials("FACEBOOK", user.email, "", user);
      }
    }).catch(error=>{
      this.SweetalertService.modal("error",environment.MENSAJES.ERROR);
      console.log(error);
    });
  }

  sendCredentials(providerAuth, email, password, providerAuthData={} ){
    this.authService.sendCredentials(providerAuth, providerAuthData, email, password).subscribe(response => {

      if (response.RESPUESTA=="EXITO") {
        this.prepararInicio(response.DATOS.TOKEN, response.DATOS.USUARIO);
        return;
      }

      if (providerAuth!="LOCAL") {
        this.authService.logOutInProvider();
      };
      this.SweetalertService.modal("info",response.MENSAJE);
    },
      err => {//TODO error 400>=
        this.spinner.hide();
        this.SweetalertService.modal("error",environment.MENSAJES.ERROR);
        console.log(err);

      })
  }


  prepararInicio(TOKEN,USUARIO){
    this.LocalStorageService.postData('token', TOKEN);
    this.LocalStorageService.postDatoJson('usuario', USUARIO);
    this.router.navigateByUrl("/");
     /** spinner starts on init */
    this.spinner.show("init");
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide("init");
    }, 5000);
  }

}
