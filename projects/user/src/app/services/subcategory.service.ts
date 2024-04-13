import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subcategory } from '../models/subcategory';
import {Api} from '../../../../../Api';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  baseurl = Api+"subcategories";


  constructor(private http: HttpClient) { };

  LoadSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(this.baseurl);
  }

  DeleteSubcategory(id: object): Observable<Subcategory> {
    return this.http.delete<Subcategory>(this.baseurl + '/' + id);
  }

  AddSubcategory(art: Subcategory): Observable<Subcategory> {
    return this.http.post<Subcategory>(this.baseurl, art);
  }

  UpdateSubcategory(id: object, art: Subcategory): Observable<Subcategory> {
    return this.http.put<Subcategory>(this.baseurl + '/' + id, art);
  }

  GetSubcategory(id: object): Observable<Subcategory> {
    return this.http.get<Subcategory>(this.baseurl + '/' + id);
  }
}
