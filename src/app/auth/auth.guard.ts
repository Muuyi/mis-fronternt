import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private router : Router) {
    
  }
  canActivate(
    next : ActivatedRouteSnapshot,
    state : RouterStateSnapshot): boolean{
      if (localStorage.getItem('token') != null)
        return true;
      else{
        this.router.navigate(['/admin']);
        return false;
      }
    }
}
