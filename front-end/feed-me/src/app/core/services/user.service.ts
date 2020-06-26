import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(`${environment.serverUrl}/user`).toPromise();
  }

  getUser(uid: any) {
    return this.http.get(`${environment.serverUrl}/user/${uid}`).toPromise();
  }

  addUser(user: User) {

  }

  updateUser(user: User) {

  }

  deleteUser(user: User) {

  }
}
