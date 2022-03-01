// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API:"http://localhost/ON-GNIOS/API_ZEUS_PHP/index.php",
  VERSION:"V1",
  EMPRESA_DESARROLLADORA_NOMBRE:"OnGenios",
  EMPRESA_CLIENTE_NOMBRE:"TEST",
  LOGO_CLIENTE:"http://localhost:4200/assets/img/brand/red.png",
  LOGO_CLIENTE_INICIO:"http://localhost:4200/assets/img/brand/red.png",
  CLIENTE_LOGO_SIDEBAR:"http://localhost:4200/assets/img/brand/red.png",
  MENSAJES:{
    "ERROR" : "😢😢 Perdon por el inconveniente, por favor comuniquese con el administrador del sistema.",
    "CERRAR_SESION" : "😣 Seguro que desea cerrar sesión?",
    "MENSAJE_DE_BIENVENIDA" :"😎 Bienvenido.. 😉",
    "ACCESO_NO_PERMITIDO" :"😓 Acceso no permitido."
  },
  GOOGLE_CLIENTE_ID:"667730095943-qmi7cqm2bgh8dj8futbslb0bv89o3r1a.apps.googleusercontent.com",
  FACEBOOK_CLIENTE_ID:"1105904470241606",
  VALIDATE_PROVIDER_AUTH_DATA : false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
