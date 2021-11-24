import { HttpErrorResponse,  HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  httpClient: any;
  apiURL = environment.backend_address;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "X-Tenant": "cassandra"
    })
  }

  

  constructor(private router: Router,private http: HttpClient) { }

  // ErrorHandler Service For getting Proper Error message

  errorHandler(httpError: HttpErrorResponse) {
    
     let errorMessage = '';
     if(httpError.error.status == 403)
     {
       errorMessage = httpError.error.error;
       window.alert(errorMessage);
       this.router.navigate(['/login']);
     }
     if(httpError.error.status == 500)
     {
      errorMessage = httpError.error.error;
     }
    else

    errorMessage = httpError.error.message

    // 'Return an observable with a user-cafinc error message.
    return throwError(errorMessage);
  }

  getToken()
  {
    
    return JSON.parse(localStorage.getItem('token') || '{}');
  }
  removeToken()
  {
    localStorage.removeItem('token');
    localStorage.clear();
  }
}

