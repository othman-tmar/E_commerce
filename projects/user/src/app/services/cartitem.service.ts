import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cartitem } from '../models/cartitem';
import {Api} from '../../../../../Api';
@Injectable({
  providedIn: 'root'
})
export class CartitemService {


  baseurl = Api+"cartitems";


  constructor(private http: HttpClient) { };



  LoadCartitems(): Observable<Cartitem[]> {
    return this.http.get<Cartitem[]>(this.baseurl);
  }

  DeleteCartitem(id: object): Observable<Cartitem> {
    return this.http.delete<Cartitem>(this.baseurl + '/' + id);
  }

  AddCartitem(art: Cartitem): Observable<Cartitem> {
    return this.http.post<Cartitem>(this.baseurl, art);
  }

  UpdateCartitem(id: object, art: Cartitem): Observable<Cartitem> {
    return this.http.put<Cartitem>(this.baseurl + '/' + id, art);
  }

  GetCartitem(id: object): Observable<Cartitem> {
    return this.http.get<Cartitem>(this.baseurl + '/' + id);
  }






}
