import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Restaurent } from '../Module/restaurent';
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpClient: any;

  constructor(private http: HttpClient, private error: ErrorHandlerService) {

  }
 
  private apiURL = this.error.apiURL;
  httpOptions = this.error.httpOptions;

  

  // Get name of Restaurent
  getName(): Observable<Restaurent> {
    return this.http.get(this.apiURL + '/restaurant/getbyid/1', this.httpOptions)
      .pipe(
        catchError(this.error.errorHandler)
      )
  }

  // Get Monthly Expenses

  getMonthlyExpense(data: any): Observable<any> {
    return this.http.post(this.apiURL + '/customerinfo/get-total-amount'
      , JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.error.errorHandler)
      )
  }

  // add Visit for not P2G Customers
  addVisit(visit: any) {
    return this.http.post(this.apiURL + '/visit/add', JSON.stringify(visit), this.httpOptions)
      .pipe(
        catchError(this.error.errorHandler)
      )

  }

  // Checkout Payment

  checkoutPayment(id: any) {
    return this.http.post(this.apiURL + '/customerinfo/checkout-payment', JSON.stringify(id), this.httpOptions)
      .pipe(
        catchError(this.error.errorHandler)
      )
  }

  // get Current Visit orders
  getCurrentVisitOrders(id: any) {
    return this.http.get(this.apiURL + '/customerinfo/get-current-visit-order/' + id, this.httpOptions)

      .pipe(
        catchError(this.error.errorHandler)
      )

  }

  getVisitedCustomers(id: any) {

    return this.http.get(this.apiURL + '/visit/get-open-visits-by-tableid/' + id, this.httpOptions)
      .pipe(
        catchError(this.error.errorHandler)
      )
  }


  //get All Visit

  getVisitAll() {
    return this.http.get(this.apiURL + '/visit/all', this.httpOptions)

      .pipe(
        catchError(this.error.errorHandler)
      )
  }

  // Get Orders By Visit Id

  getOrderByVisit(id: any) {
    return this.http.get(this.apiURL + '/order/getbyvisitid/' + id, this.httpOptions)
      .pipe(
        catchError(this.error.errorHandler)
      )
  }

  // Get all foodItems
  getAll(): Observable<{}> {

    return this.http.get(this.apiURL + '/fooditem/all', this.httpOptions)

      .pipe(
        catchError(this.error.errorHandler)
      )
  }

  // find Open Visit By customer

  getOpenVisitByCustomer(id: any): Observable<{}> {
    return this.http.get(this.apiURL + '/visit/get-open-visit-by-customerid/' + id, this.httpOptions)

      .pipe(
        catchError(this.error.errorHandler)
      )
  }

  // Get opened visit Details

  getVisit(id: any): Observable<{}> {
    return this.http.get(this.apiURL + '/visit/getbyid/' + id, this.httpOptions)
      .pipe(
        catchError(this.error.errorHandler)
      )
  }

}



