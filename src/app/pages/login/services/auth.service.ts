
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/servicios/local-storage.service';
import { SweetalertService } from 'src/app/servicios/sweetalert.service';
import { environment } from 'src/environments/environment';
import { AuthAbstract } from './abstract/auth.abstract';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends AuthAbstract {
}
