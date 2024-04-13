import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../models/notification';
import {Api} from '../../../../../Api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseurl = Api+"notifications";


  constructor(private http: HttpClient) { };

  LoadNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseurl);
  }

  DeleteNotification(id: object): Observable<Notification> {
    return this.http.delete<Notification>(this.baseurl + '/' + id);
  }

  AddNotification(art: Notification): Observable<Notification> {
    return this.http.post<Notification>(this.baseurl, art);
  }

  UpdateNotification(id: object, art: Notification): Observable<Notification> {
    return this.http.put<Notification>(this.baseurl + '/' + id, art);
  }

  GetNotification(id: object): Observable<Notification> {
    return this.http.get<Notification>(this.baseurl + '/' + id);
  }
}
