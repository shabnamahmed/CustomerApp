import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login } from '../Module/login';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  httpClient: any;
  constructor(private http: HttpClient,private error : ErrorHandlerService) { }
 
  private apiURL = this.error.apiURL;
  httpOptions = this.error.httpOptions;

  auth = JSON.parse(localStorage.getItem('tokenData') || '{}');
  

  getAll(): Observable<Login> {
    return this.http.get(this.apiURL + '/SignUp')
      .pipe(
        catchError(this.error.errorHandler)
      )
  }

  create(login: Login): Observable<Login> {
  
    return this.http.post(this.apiURL + '/customer-login/', JSON.stringify(login), this.httpOptions)

      .pipe(
        catchError(this.error.errorHandler)
      )
  }


  find(id: number): Observable<Login> {

    return this.http.get(this.apiURL + '/SignUp/' + id)

      .pipe(
        catchError(this.error.errorHandler)
      )
  }

  update(id: number, Signup: Login): Observable<Login> {

    return this.http.put(this.apiURL + '/SignUp/' + id, JSON.stringify(Signup), this.httpOptions)

      .pipe(
        catchError(this.error.errorHandler)
      )
  }

  delete(id: number) {
    return this.http.delete(this.apiURL + '/SignUp/' + id, this.httpOptions)
      .pipe(
        catchError(this.error.errorHandler)
      )
  }
  logOut() {
    return this.http.get(this.apiURL + '/customer-logout', this.httpOptions)
      .pipe(
        catchError(this.error.errorHandler)
      )
  }
}
