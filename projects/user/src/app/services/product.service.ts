import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import {Api} from '../../../../../Api';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  searchText:any;

  baseurl = Api +"products";


constructor(private http: HttpClient,
    ) { };


  LoadProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseurl);
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

  getSearchText(){
    return this.searchText ;
  }
  setSearchText(data:any){
    this.searchText =data;
  }
}
