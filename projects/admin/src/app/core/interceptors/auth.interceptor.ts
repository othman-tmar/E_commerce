/*  import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable,catchError,switchMap, throwError, } from 'rxjs';
import Api from '../../services/Api';
import { AdminAuthService } from '../../services/admin-auth.service';



import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import {  filter,  take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {




  private refreshTokenInterval: any;

  constructor(private http: HttpClient,
    private authservice:AdminAuthService) {}

 intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
  const jwtToken = this.authservice.getToken();
  if(jwtToken){
   request = request.clone({
    headers: request.headers.append('Authorization', 'Bearer ' + jwtToken)
  });}
  
  
  return next.handle(request).pipe(
    catchError((err:any)=> {
      if(err instanceof HttpErrorResponse){
       if (err.status === 401 || err.status === 403  ) {
         return this.handleRefreshToken(request, next);
        } 
      }
      return throwError(()=> err)
      
    })
  );
  
  }

  handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
   

    return this.authservice.GenerateRefreshToken().pipe(
      switchMap((data: any) => {
        console.log(data)
        this.authservice.SaveTokens(data);

        return next.handle(this.AddTokenheader(request,data.jwtToken))
      }),
      catchError(errodata=>{
        
        return throwError(()=>{errodata
             this.authservice.logout();  
      })
       }) 
   
  )}
    
   
  
 
  AddTokenheader(request: HttpRequest<any>, token: any) {
    return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });
  }
 
} */


 /*  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = localStorage.getItem('jwtToken');
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('signin') && error.status === 403) {
        return this.handle401Error(authReq, next);
      }

      return throwError(error);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.authservice.GetRefreshToken();

      if (token)
        return this.authservice.GenerateRefreshToken(token).pipe(
          switchMap((data: any) => {
            this.isRefreshing = false;

            this.authservice.SaveTokens(data);
            this.refreshTokenSubject.next(data.jwtToken);
            
            return next.handle(this.addTokenHeader(request, data.jwtToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            
            this.authservice.logout();  
            return throwError(err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(jwtToken => jwtToken !== null),
      take(1),
      switchMap((jwtToken) => next.handle(this.addTokenHeader(request, jwtToken)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
   

    
    return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });
  } 
 }

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
 */

 import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

import { AdminAuthService } from '../../services/admin-auth.service';

import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor, OnDestroy {

  private refreshTokenInterval: any;

  constructor(private http: HttpClient, private authservice: AdminAuthService) {
    // Set up interval to periodically check token expiration and refresh if necessary
    this.refreshTokenInterval = setInterval(() => {
      const token = this.authservice.getToken();
      const tokenExpiration = this.authservice.getTokenExpiration();
   
      if (token && tokenExpiration && Date.now() > tokenExpiration - 600) {
        // Token is about to expire, refresh it
        this.authservice.GenerateRefreshToken().subscribe(
          (data: any) => {
            console.log(data);
            this.authservice.SaveTokens(data);
          },
          (error) => {
            console.error(error);
            // Handle error, e.g. log out user
          }
        );
      }
    }, 600); // Check every minute
  }

  ngOnDestroy() {
    // Clean up interval when service is destroyed
    clearInterval(this.refreshTokenInterval);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = this.authservice.getToken();
    if (jwtToken) {
      request = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + jwtToken),
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            return this.handleRefreshToken(request, next);
          }
        }
        return throwError(() => err);
      })
    );
  }

  handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    return this.authservice.GenerateRefreshToken().pipe(
      switchMap((data: any) => {
        const tokenExpiration = this.authservice.getTokenExpiration();
        console.log(tokenExpiration)
        console.log(Date.now())
        this.authservice.SaveTokens(data);

        return next.handle(this.AddTokenheader(request, data.jwtToken));
      }),
      catchError((errodata) => {
        return throwError(() => {
          errodata;
          this.authservice.logout();
        });
      })
    );
  }

  AddTokenheader(request: HttpRequest<any>, token: any) {
    return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });
  }
} 