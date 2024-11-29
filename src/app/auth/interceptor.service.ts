import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the JWT token from localStorage
    const token = localStorage.getItem('authToken');

    // If the token exists, clone the request and add Authorization header
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // Add Bearer token to headers
        }
      });
    }

    // Proceed with the cloned request
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized error (e.g., token expired or invalid)
        if (error.status === 401) {
          console.log('Token expired or invalid, redirecting to login.');
          this.router.navigateByUrl('/login');  // Redirect to login page
        }
        
        // Propagate the error further if necessary
        return throwError(error);
      })
    );
  }
}
