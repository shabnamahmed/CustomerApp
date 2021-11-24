import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = JSON.parse(localStorage.getItem('tokenData') || '{}');
    const modifiedReq = req.clone({ 
      headers: req.headers.set('Authorization', `Bearer ${auth}`)
                          .set('Content-Type','application/json')
                          .set("X-Tenant","cassandra"),
    });
    return next.handle(modifiedReq);
  }
}
