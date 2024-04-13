import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import {Api} from '../../../../../Api';


@Injectable({
  providedIn: 'root'
})
export class OrderService {



  baseurl = Api+"orders";


  constructor(private http: HttpClient) { };

  LoadOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseurl);
  }

  DeleteOrder(id: object): Observable<Order> {
    return this.http.delete<Order>(this.baseurl + '/' + id);
  }

  AddOrder(art: Order): Observable<Order> {
    return this.http.post<Order>(this.baseurl, art);
  }

  UpdateOrder(id: object, art: Order): Observable<Order> {
    return this.http.put<Order>(this.baseurl + '/' + id, art);
  }

  GetOrder(id: object): Observable<Order> {
    return this.http.get<Order>(this.baseurl + '/' + id);
  }





}
