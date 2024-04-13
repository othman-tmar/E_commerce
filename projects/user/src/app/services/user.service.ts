import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import {Api} from '../../../../../Api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = Api+"users";


  constructor(private http: HttpClient) { };

  LoadUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseurl);
  }

  DeleteUser(id: object): Observable<User> {
    return this.http.delete<User>(this.baseurl + '/' + id);
  }

  AddUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseurl, user);
  }

  UpdateUser(id: object, art: User): Observable<User> {
    return this.http.put<User>(this.baseurl + '/' + id, art);
  }

  GetUser(id: object): Observable<User> {
    return this.http.get<User>(this.baseurl + '/' + id);
  }
}
