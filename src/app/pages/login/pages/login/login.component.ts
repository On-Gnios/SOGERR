import { Route } from '@angular/compiler/src/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FrasesDeMotivacionService } from 'src/app/servicios/frases-de-motivacion.service';
import { SweetalertService } from 'src/app/servicios/sweetalert.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
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
  constructor(public SweetalertService: SweetalertService ,private fb: FormBuilder,public FrasesDeMotivacionService:FrasesDeMotivacionService,private authService: AuthService, private cookie: CookieService,
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
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12)
          ])
      }
    )
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value
    this.authService.sendCredentials(email, password)
      //TODO: 200 <400
      .subscribe(response => { //TODO: Cuando el usuario credenciales Correctas ✔✔

        if (response.RESPUESTA=="EXITO") {
          this.router.navigateByUrl("/");
          return;
        }

        this.SweetalertService.modal("info",response.MENSAJE);
        /* const { tokenSession, data } = responseOk
        this.cookie.set('token', tokenSession, 4, '/') //TODO:📌📌📌📌
        this.router.navigateByUrl("/"); */
      },
        err => {//TODO error 400>=
          this.errorSession = true
          console.log('⚠⚠⚠⚠Ocurrio error con tu email o password');
        })
  }

}
