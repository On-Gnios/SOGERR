import { Injectable } from '@angular/core';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { AuthAbstract } from './abstract/auth.abstract';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService extends AuthAbstract{

  loginWithGoogle(){
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  authState(){
    return this.socialAuthService.authState;
  }



}
