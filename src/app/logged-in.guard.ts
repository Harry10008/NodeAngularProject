import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    // Check if user is logged in
    const user = localStorage.getItem('user');

    if (user) {
      // Allow access to the route if the user is logged in
      return true;
    } else {
      // Redirect to login if the user is not logged in
      this.router.navigate(['/login']);
      return false;
    }
  }
}
