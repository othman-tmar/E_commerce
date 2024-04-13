import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import {Api} from '../../../../../Api';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseurl = Api+"products";

/*   requestHeader = new HttpHeaders({
    'Authorization': `Bearer ${this.adminAuthService.getToken()}`,
    'No-Auth': 'True'
  });
 */

  constructor(private http: HttpClient,
    private adminAuthService: AdminAuthService) { };

  LoadProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseurl/* ,{
      headers: this.requestHeader,
    } */);
  }

  DeleteProduct(id: object): Observable<Product> {
    return this.http.delete<Product>(this.baseurl + '/' + id);
  }

  AddProduct(art: Product): Observable<Product> {
    return this.http.post<Product>(this.baseurl, art);
  }

  UpdateProduct(id: object, art: Product): Observable<Product> {
    return this.http.put<Product>(this.baseurl + '/' + id, art);
  }

  GetProduct(id: object): Observable<Product> {
    return this.http.get<Product>(this.baseurl + '/' + id);
  }
}
