import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Subcategory } from '../models/subcategory';
import {Api} from '../../../../../Api';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  baseurl = Api+"subcategories";

  requestHeader = new HttpHeaders({
    'Authorization': `Bearer ${this.adminAuthService.getToken()}`,
    'No-Auth': 'True'
  });

  constructor(private http: HttpClient,
    private adminAuthService: AdminAuthService) { };

  LoadSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(this.baseurl);
  }

  DeleteSubcategory(id: object): Observable<Subcategory> {
    return this.http.delete<Subcategory>(this.baseurl + '/' + id);
  }

  AddSubcategory(art: Subcategory): Observable<Subcategory> {
    return this.http.post<Subcategory>(this.baseurl, art,{
      headers: this.requestHeader,
    });
  }

  UpdateSubcategory(id: object, art: Subcategory): Observable<Subcategory> {
    return this.http.put<Subcategory>(this.baseurl + '/' + id, art);
  }

  GetSubcategory(id: object): Observable<Subcategory> {
    return this.http.get<Subcategory>(this.baseurl + '/' + id);
  }
}
