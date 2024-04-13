import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminAuthService } from './admin-auth.service';
import { Observable } from 'rxjs';
import {Api} from '../../../../../Api';
import { Admin } from '../models/admin';


@Injectable({
  providedIn: 'root'
})


export class AdminService {

  baseurl = Api+"admins";


  constructor(
    private httpclient: HttpClient,
    private adminAuthService: AdminAuthService
  ) {}

  public singin(loginData:any) {
    return this.httpclient.post(Api + 'admins/login', loginData);
   
  }

  public singup(admin:Admin) {
    return this.httpclient.post(Api + 'admins/register',admin)
  }

  public roleMatch(allowedRoles:any): boolean {
    let isMatch = false;
    const Roles = this.adminAuthService.getRoles();
     console.log(Roles)
    /* if (Roles != null && Roles) {
      for (let i = 0; i < Roles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (Roles[i].roles === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    } */
    if(Roles != null && Roles==allowedRoles){
      isMatch = true;
    }
    return isMatch;
}

//CRUD SERVICES 
LoadAdmins(): Observable<Admin[]> {
  return this.httpclient.get<Admin[]>(this.baseurl);
}
  
DeleteAdmin(id: object): Observable<Admin> {
  return this.httpclient.delete<Admin>(this.baseurl + '/' + id);
}


UpdateAdmin(id: object, adm: Admin): Observable<Admin> {
  return this.httpclient.put<Admin>(this.baseurl + '/' + id, adm);
}

GetAdmin(id: string): Observable<Admin> {
  return this.httpclient.get<Admin>(this.baseurl + '/' + id);
}
}
