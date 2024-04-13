import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import {Api} from '../../../../../Api';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseurl = Api+"categories";


  constructor(private http: HttpClient) { };

  LoadCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseurl);
  }

  DeleteCategory(id: object): Observable<Category> {
    return this.http.delete<Category>(this.baseurl + '/' + id);
  }

  AddCategory(art: Category): Observable<Category> {
    return this.http.post<Category>(this.baseurl, art);
  }

  UpdateCategory(id: object, art: Category): Observable<Category> {
    return this.http.put<Category>(this.baseurl + '/' + id, art);
  }

  GetCategory(id: object): Observable<Category> {
    return this.http.get<Category>(this.baseurl + '/' + id);
  }
}

