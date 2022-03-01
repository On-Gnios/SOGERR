import { Injectable } from '@angular/core';
import { FacebookLoginProvider } from 'angularx-social-login';
import { AuthAbstract } from './abstract/auth.abstract';

@Injectable({
  providedIn: 'root'
})
export class AuthFacebookService extends AuthAbstract {

  loginWithFacebook(){
    return this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }

  authState(){
    return this.socialAuthService.authState;
  }
}
