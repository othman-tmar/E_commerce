import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../../../../../Api';
import {  Router } from '@angular/router';



  
@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private http: HttpClient,
    private router:Router) { }
  public setRoles(roles:any) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles():string {
    return JSON.parse(localStorage.getItem('roles')|| '');
  }
 
  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }
  public setID(ID: string) {
    localStorage.setItem('Id', ID);
  }
  public setRefreshToken(jwtRefreshToken: string) {
    localStorage.setItem('refreshToken', jwtRefreshToken);
  }
  public getToken(){
   return localStorage.getItem('jwtToken')|| ''; 
 
  }


  public clear() {
    localStorage.clear();
  }

  GetRefreshToken() {
    return localStorage.getItem("refreshToken") || '';
  }

 public GenerateRefreshToken() {
  
   
    const refreshToken= this.GetRefreshToken()

  console.log(refreshToken)
    return this.http.post(Api + 'admins/refreshToken/',  { refreshToken: refreshToken });
  } 


  /* public GenerateRefreshToken(refreshToken:string) {
  
   
    

  console.log(refreshToken)
    return this.http.post(Api + 'admins/refreshToken/',  { refreshToken: refreshToken });
  }

 */
 public SaveTokens(tokendata: any) {
    localStorage.setItem('jwtToken', tokendata.jwtToken);
    localStorage.setItem('refreshToken', tokendata.refreshToken);
  }

 /*  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  } 
 */
  isLoggedIn(): boolean{
    return !! this.getToken()
  }

  logout() {
   
    this.router.navigate(['']).then(f=>{  this.clear()})
  
  }
  
  getTokenExpiration(): number | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken && decodedToken.exp) {
        return decodedToken.exp * 1000;
      }
    }
    return null;
  }

}
