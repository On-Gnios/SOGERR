import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  logoClienteInicio = environment.LOGO_CLIENTE_INICIO;
  mensajeDeBienvenida = environment.MENSAJES.MENSAJE_DE_BIENVENIDA;
  title = 'argon-dashboard-angular';
}
