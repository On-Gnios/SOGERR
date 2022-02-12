import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  headers = { headers: new HttpHeaders({
    'Content-Type': 'aplication/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200/',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers' : 'X-Requested-With,content-type'
  }) };
  constructor(private http: HttpClient) { }

  getJson(url):Observable<any>{
    return this.http.get<any>(environment.API+url);
  }

  postJson(controlador,operacion,Data:any={}):Observable<any>{
    Data.controlador=controlador;
    Data.operacion=operacion;
  
    return this.http.post<any>(environment.API,Data);
  }

  putJson(Data:any,url):Observable<any>{
    return this.http.patch<any>(environment.API+url,Data);
  }

  postFormData(controlador,operacion,formData:any=new FormData()):Observable<any>{
    formData.append('controlador', controlador);
    formData.append('operacion', operacion);
    
    return this.http.post<any>(environment.API,formData);
  }
}
