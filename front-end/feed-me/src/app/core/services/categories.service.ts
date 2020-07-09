import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import DEFAULT_CATEGORIES from '../models/default-categories.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories: any = [];

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get(`${environment.api}/category`).toPromise();
  }

  getCategoryById(categoryId: string) {
    return this.http.get(`${environment.api}/category/${categoryId}`).toPromise();
  }

  getDefaultCategories() {
    return DEFAULT_CATEGORIES;
  }
}
