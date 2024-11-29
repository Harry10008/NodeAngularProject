import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    // Check if the user is logged in
    const user = localStorage.getItem('user');

    if (user) {
      // Redirect to home if the user is logged in
      this.router.navigate(['/home']);
      return false;
    } else {
      // Allow access if the user is not logged in
      return true;
    }
  }
}
