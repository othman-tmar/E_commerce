/* import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice:AdminAuthService, private router: Router){

  }
  canActivate():boolean{
    if(this.authservice.isLoggedIn()){
      return true
    }else{
   
      this.router.navigate(['login'])
      return false;
    }
  }
  
}
 */

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';
import { AdminService } from '../services/admin.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router,
    private adminService: AdminService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.adminAuthService.getRoles()) {
      const  role = route.data["roles"]
     console.log(role)
      if (role) {
        const match = this.adminService.roleMatch(role);
        console.log(match)
        if (match) {
         
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }

    
    return false;
  }
}
