import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';


import { catchError } from 'rxjs/operators';
import { Login } from '../Module/login';
@Injectable({
  providedIn: 'root'
})

export class SignUpService {
  httpClient: any;
  constructor(private http : HttpClient,private error: ErrorHandlerService) { }
  
  private apiURL = this.error.apiURL;
  httpOptions = this.error.httpOptions;

   generateToken(login:Login){
  return this.http.post(this.apiURL + '/generate-token/', JSON.stringify(login),this.httpOptions)
   }

   // Signup
   signup(signup:any)
   {
    return this.http.post(this.apiURL + '/customer/add', JSON.stringify(signup),this.httpOptions).pipe(
      catchError(this.error.errorHandler)
    )
   }
delete(id:number){
return this.http.delete(this.apiURL + '/SignUp/' + id, this.httpOptions)

.pipe(
  catchError(this.error.errorHandler)
)
}
 getIPAddress()  
{  
  return this.http.get("http://api.ipify.org/?format=json");  
}  
}
