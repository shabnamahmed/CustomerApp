import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  httpClient: any;

  constructor(private http: HttpClient,private error : ErrorHandlerService) {
    
   }
 
  private apiURL = this.error.apiURL;
  httpOptions = this.error.httpOptions;
  ngOnInit() {
  }

  //Get Customer Visits

 getCustomerOrders(id:any): Observable<any>
 {
    return this.http.get(this.apiURL + '/visit/get-visits-by-customerid/'+id, this.httpOptions)
    .pipe(
      catchError(this.error.errorHandler)
    )
 }
 
 // Get CustomerName

 getName(id:any)
 {
  return this.http.get(this.apiURL + '/customer/getbyid/'+id, this.httpOptions)
  .pipe(
    catchError(this.error.errorHandler)
  )
 }

 // Get All FoodItems

  getAll(): Observable<{}> {

    return this.http.get(this.apiURL + '/fooditem/all', this.httpOptions)

      .pipe(
        catchError(this.error.errorHandler)
      )
  }

  logOut()
  {
    return this.http.get(this.apiURL + '/customer-logout', this.httpOptions)

      .pipe(
        catchError(this.error.errorHandler)
      )
  }

  // Get CustomerDetails By Id

  getCustomer(id:any)
  {
    return this.http.get(this.apiURL + '/customer/getbyid/'+id, this.httpOptions)

    .pipe(
      catchError(this.error.errorHandler)
    )
  }

  // Update Customer Profile

  updatecustomer(data:any)
  {
    return this.http.put(this.apiURL + '/customer/update', JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.error.errorHandler)
    )
  }
}



