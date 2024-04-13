import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart';
import {Api} from '../../../../../Api';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseurl = Api+"carts";


  constructor(private http: HttpClient,
    ) { };

  LoadCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.baseurl);
  }

  DeleteCart(id: object): Observable<Cart> {
    return this.http.delete<Cart>(this.baseurl + '/' + id);
  }

  AddCart(art: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.baseurl, art);
  }

  UpdateCart(id: object, art: Cart): Observable<Cart> {
    return this.http.put<Cart>(this.baseurl + '/' + id, art);
  }

  GetCart(id: object): Observable<Cart> {
    return this.http.get<Cart>(this.baseurl + '/' + id);
  }
}
